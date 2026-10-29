# PDF Form System Complete

ระบบ Node.js + Express + pdf-lib สำหรับกรอกข้อมูลลงบน PDF Template 2 แบบ พร้อมหน้าเว็บภาษาไทย

## เริ่มต้นใช้งาน

```bash
npm install
npm start
```

เปิด `http://localhost:3000`

## โครงสร้าง

```text
pdf-form-system-complete/
├── assets/
│   ├── template-application.pdf
│   ├── template-disclosure.pdf
│   └── THSarabunNew.ttf          # เพิ่มเองได้ ถ้าไม่มีจะใช้ Noto Sans Thai
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── server.js
├── package.json
└── README.md
```

## การปรับพิกัด

แก้ `TEMPLATE_CONFIG` ใน `server.js` โดยพิกัด PDF เริ่มจากมุมซ้ายล่าง

- `application`: PDF ขนาด Letter 612 x 792 pt
- `disclosure`: PDF ขนาด A4 595 x 842 pt
- `fields`: พิกัดข้อความทั่วไป
- `registration.centers`: จุดกึ่งกลางของกล่องเลขทะเบียนทั้ง 13 ช่อง

## ความเป็นส่วนตัว

PDF ต้นฉบับไม่ถูกเขียนทับ ข้อมูลและ PDF ผลลัพธ์ไม่ถูกบันทึกลงดิสก์ ระบบสร้างผลลัพธ์ในหน่วยความจำและส่งกลับให้ดาวน์โหลดทันที
# Consent
