// MAPPING2: template-application.pdf
// ใบคำขอสินเชื่อ
// ใช้เฉพาะ template-application.pdf
// PDF coordinate เริ่มจากมุมซ้ายล่าง
// หมายเหตุ: พิกัดเดิมที่ยืนยันแล้วห้ามแก้

const MAPPING2 = {
  file: './template-application.pdf',

  fields: {
    companyName: { page: 0, x: 178, y: 542, size: 8, maxWidth: 185 },
    registrationDate: { page: 0, x: 418, y: 526, size: 8, maxWidth: 120 },
    companyAddress: { page: 0, x: 162, y: 494, size: 8, maxWidth: 360, lineHeight: 12 },
    phoneNo: { page: 0, x: 178, y: 466, size: 8, maxWidth: 190 },
authorizedName: [
  { page: 0, x: 194, y: 512, size: 8, maxWidth: 125 },
  { page: 0, x: 356, y: 70, size: 8, maxWidth: 120, align: 'right-point' }
],

authorizedName2: [
  { page: 0, x: 418, y: 512, size: 8, maxWidth: 130 },
  { page: 0, x: 376, y: 70, size: 8, maxWidth: 120 }
],
authorizedNameCenter: { page: 0, x: 366, y: 70, size: 8, maxWidth: 260, align: 'center-point' },

    faxNo: { page: 0, x: 405, y: 466, size: 8, maxWidth: 120 },
    contactName1: { page: 0, x: 128, y: 420, size: 8, maxWidth: 140 },
    contactPhone1: { page: 0, x: 310, y: 420, size: 8, maxWidth: 110 },
    contactEmail1: { page: 0, x: 390, y: 420, size: 8, maxWidth: 120 },
    contactName2: { page: 0, x: 165, y: 405, size: 8, maxWidth: 140 },
    contactPhone2: { page: 0, x: 310, y: 405, size: 8, maxWidth: 110 },
    contactEmail2: { page: 0, x: 390, y: 405, size: 8, maxWidth: 120 },
    loanType: { page: 0, x: 200, y: 360, size: 8, maxWidth: 250 },

    itemQty1: { page: 0, x: 96, y: 305, size: 8, maxWidth: 40 },
    itemCondition1: { page: 0, x: 138, y: 305, size: 8, maxWidth: 45 },
    itemBrand1: { page: 0, x: 200, y: 305, size: 8, maxWidth: 80 },
    itemDetail1: { page: 0, x: 280, y: 305, size: 8, maxWidth: 180 },
    itemPrice1: { page: 0, x: 470, y: 305, size: 8, maxWidth: 70 },

    itemQty2: { page: 0, x: 96, y: 288, size: 8, maxWidth: 40 },
    itemCondition2: { page: 0, x: 138, y: 288, size: 8, maxWidth: 45 },
    itemBrand2: { page: 0, x: 200, y: 288, size: 8, maxWidth: 80 },
    itemDetail2: { page: 0, x: 280, y: 288, size: 8, maxWidth: 180 },
    itemPrice2: { page: 0, x: 470, y: 288, size: 8, maxWidth: 70 },

    itemQty3: { page: 0, x: 96, y: 272, size: 8, maxWidth: 40 },
    itemCondition3: { page: 0, x: 138, y: 272, size: 8, maxWidth: 45 },
    itemBrand3: { page: 0, x: 200, y: 272, size: 8, maxWidth: 80 },
    itemDetail3: { page: 0, x: 280, y: 272, size: 8, maxWidth: 180 },
    itemPrice3: { page: 0, x: 470, y: 272, size: 8, maxWidth: 70 },

    itemQty4: { page: 0, x: 96, y: 256, size: 8, maxWidth: 40 },
    itemCondition4: { page: 0, x: 138, y: 256, size: 8, maxWidth: 45 },
    itemBrand4: { page: 0, x: 200, y: 256, size: 8, maxWidth: 80 },
    itemDetail4: { page: 0, x: 280, y: 256, size: 8, maxWidth: 180 },
    itemPrice4: { page: 0, x: 470, y: 256, size: 8, maxWidth: 70 }
  },

  registration: {
    mode: 'continuous',
    page: 0,
    x: 194,
    y: 526,
    size: 8,
    maxWidth: 130
  }
};
