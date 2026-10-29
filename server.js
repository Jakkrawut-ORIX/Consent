'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const { PDFDocument, rgb } = require('pdf-lib');
const fontkit = require('@pdf-lib/fontkit');

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

const TEMPLATE_CONFIG = Object.freeze({
  application: {
    label: 'TOLC Consent & Application',
    file: path.join(__dirname, 'assets', 'template-application.pdf'),
    outputName: 'tolc-application-filled.pdf',
    // TODO: ใส่พิกัดจริงหลังวัดจาก template-application.pdf
    fields: {
      companyName:     { page: 0, x: 175, y: 486, size: 14, maxWidth: 240 },
      companyType:     { page: 0, x: 455, y: 486, size: 14, maxWidth: 125 },
      phoneNo:         { page: 0, x: 450, y: 443, size: 14, maxWidth: 130 },
      authorizedName:  { page: 0, x: 120, y: 405, size: 14, maxWidth: 210 },
      authorizedName2: { page: 0, x: 365, y: 405, size: 14, maxWidth: 210 },
      registrarOffice: { page: 0, x: 385, y: 366, size: 11, maxWidth: 195 }
    },
    registration: {
      page: 0,
      y: 444,
      size: 14,
      centers: [271, 310, 343, 376, 409, 448, 481, 514, 547, 580, 619, 652, 685]
    }
  },

  disclosure: {
    label: 'Consent for Disclosure Information',
    file: path.join(__dirname, 'assets', 'template-disclosure.pdf'),
    outputName: 'disclosure-consent-filled.pdf',
    // TODO: ชุดนี้แยกจาก Application เพราะหน้า A4 และพิกัดไม่เหมือนกัน
    fields: {
      companyName:     { page: 0, x: 175, y: 486, size: 14, maxWidth: 240 },
      companyType:     { page: 0, x: 455, y: 486, size: 14, maxWidth: 125 },
      phoneNo:         { page: 0, x: 430, y: 443, size: 14, maxWidth: 145 },
      authorizedName:  { page: 0, x: 120, y: 405, size: 14, maxWidth: 205 },
      authorizedName2: { page: 0, x: 355, y: 405, size: 14, maxWidth: 215 },
      registrarOffice: { page: 0, x: 375, y: 366, size: 11, maxWidth: 200 }
    },
    registration: {
      page: 0,
      y: 444,
      size: 14,
      centers: [267, 305, 337, 369, 401, 439, 471, 503, 535, 567, 605, 637, 669]
    }
  }
});

function cleanText(value, maxLength = 300) {
  return String(value ?? '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function cleanDigits(value, maxLength) {
  return String(value ?? '').replace(/\D/g, '').slice(0, maxLength);
}

function validateAndNormalize(raw = {}) {
  const data = {
    companyName: cleanText(raw.companyName, 150),
    companyType: cleanText(raw.companyType, 80),
    companyRegNo: cleanDigits(raw.companyRegNo, 13),
    phoneNo: cleanDigits(raw.phoneNo, 20),
    authorizedName: cleanText(raw.authorizedName, 120),
    authorizedName2: cleanText(raw.authorizedName2, 120),
    registrarOffice: cleanText(raw.registrarOffice, 180)
  };

  const errors = {};
  if (!data.companyName) {
    errors.companyName = 'กรุณากรอกชื่อนิติบุคคล';
  }
  if (!/^\d{13}$/.test(data.companyRegNo)) {
    errors.companyRegNo = 'เลขทะเบียนนิติบุคคลต้องเป็นตัวเลข 13 หลัก';
  }

  if (Object.keys(errors).length > 0) {
    const error = new Error('ข้อมูลไม่ถูกต้อง');
    error.statusCode = 400;
    error.details = errors;
    throw error;
  }

  return data;
}

async function loadThaiFontBytes() {
  const thSarabun = path.join(__dirname, 'assets', 'THSarabunNew.ttf');
  try {
    return await fs.readFile(thSarabun);
  } catch {
    const fallback = require.resolve(
      '@fontsource/noto-sans-thai/files/noto-sans-thai-thai-400-normal.woff'
    );
    return fs.readFile(fallback);
  }
}

function drawMappedText({ pages, font, data, fields }) {
  for (const [fieldName, config] of Object.entries(fields)) {
    const value = data[fieldName];
    if (!value) continue;

    const page = pages[config.page];
    if (!page) {
      throw new Error(`ไม่พบหน้า PDF index ${config.page} สำหรับ ${fieldName}`);
    }

    page.drawText(value, {
      x: config.x,
      y: config.y,
      size: config.size,
      font,
      color: rgb(0, 0, 0),
      maxWidth: config.maxWidth,
      lineHeight: config.lineHeight || config.size * 1.15
    });
  }
}

function drawRegistrationDigits({ pages, font, companyRegNo, config }) {
  if (!config || config.centers.length !== 13) {
    throw new Error('REGISTRATION_MAPPING ต้องมีตำแหน่งกึ่งกลางครบ 13 ช่อง');
  }

  const page = pages[config.page];
  if (!page) throw new Error(`ไม่พบหน้า PDF index ${config.page} สำหรับเลขทะเบียน`);

  [...companyRegNo].forEach((digit, index) => {
    const digitWidth = font.widthOfTextAtSize(digit, config.size);
    page.drawText(digit, {
      x: config.centers[index] - digitWidth / 2,
      y: config.y,
      size: config.size,
      font,
      color: rgb(0, 0, 0)
    });
  });
}

/**
 * ฟังก์ชันหลักฟังก์ชันเดียว:
 * 1) ตรวจสอบข้อมูล
 * 2) เลือก PDF ต้นฉบับ
 * 3) ฝังฟอนต์ไทย
 * 4) Mapping ข้อความ
 * 5) แยกเลขทะเบียน 13 หลักทีละช่อง
 * 6) คืน PDF ในหน่วยความจำ โดยไม่เขียนทับต้นฉบับ
 */
async function generateMappedPdf(templateKey, rawData) {
  const config = TEMPLATE_CONFIG[templateKey];
  if (!config) {
    const error = new Error('template ต้องเป็น application หรือ disclosure');
    error.statusCode = 400;
    throw error;
  }

  const data = validateAndNormalize(rawData);
  const [templateBytes, fontBytes] = await Promise.all([
    fs.readFile(config.file),
    loadThaiFontBytes()
  ]);

  const pdfDoc = await PDFDocument.load(templateBytes, {
    updateMetadata: false,
    ignoreEncryption: false
  });
  pdfDoc.registerFontkit(fontkit);

  const thaiFont = await pdfDoc.embedFont(fontBytes, { subset: true });
  const pages = pdfDoc.getPages();

  drawMappedText({ pages, font: thaiFont, data, fields: config.fields });
  drawRegistrationDigits({
    pages,
    font: thaiFont,
    companyRegNo: data.companyRegNo,
    config: config.registration
  });

  const bytes = await pdfDoc.save({
    useObjectStreams: false,
    addDefaultPage: false,
    updateFieldAppearances: false
  });

  return {
    buffer: Buffer.from(bytes),
    outputName: config.outputName
  };
}

app.get('/api/templates', (req, res) => {
  res.json(
    Object.entries(TEMPLATE_CONFIG).map(([key, value]) => ({
      key,
      label: value.label
    }))
  );
});

app.post('/generate-pdf', async (req, res, next) => {
  try {
    const templateKey = cleanText(req.body?.template, 30);
    const result = await generateMappedPdf(templateKey, req.body || {});

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${result.outputName}"`,
      'Content-Length': result.buffer.length,
      'Cache-Control': 'no-store, max-age=0',
      Pragma: 'no-cache'
    });
    res.send(result.buffer);
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  console.error(error);
  if (res.headersSent) return next(error);

  res.status(error.statusCode || 500).json({
    message: error.statusCode ? error.message : 'ไม่สามารถสร้าง PDF ได้',
    errors: error.details || undefined
  });
});

app.listen(PORT, () => {
  console.log(`PDF server ready: http://localhost:${PORT}`);
});

module.exports = { app, generateMappedPdf, TEMPLATE_CONFIG };
