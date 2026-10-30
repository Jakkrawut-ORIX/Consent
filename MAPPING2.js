// MAPPING2: template-application.pdf
// ใบคำขอสินเชื่อ
// ทะเบียนนิติบุคคลแสดงแบบต่อเนื่อง
// PDF coordinate เริ่มจากมุมซ้ายล่าง

const MAPPING2 = {
  file: './template-application.pdf',

  fields: {
    companyName: {
      page: 0,
      x: 178,
      y: 542,
      size: 8,
      maxWidth: 185
    },

    registrationDate: {
      page: 0,
      x: 418,
      y: 528,
      size: 8,
      maxWidth: 120
    },

    companyAddress: {
      page: 0,
      x: 162,
      y: 498,
      size: 8,
      maxWidth: 360,
      lineHeight: 12
    },

    phoneNo: {
      page: 0,
      x: 178,
      y: 468,
      size: 8,
      maxWidth: 190
    },

    authorizedName: {
      page: 0,
      x: 194,
      y: 512,
      size: 8,
      maxWidth: 125
    },

    authorizedName2: {
      page: 0,
      x: 418,
      y: 512,
      size: 8,
      maxWidth: 130
    }
  },

  registration: {
    mode: 'continuous',
    page: 0,
    x: 194,
    y: 528,
    size: 8,
    maxWidth: 130
  }
};
