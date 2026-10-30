// MAPPING1: template-disclosure.pdf
// หนังสือให้ความยินยอม
// ทะเบียนนิติบุคคลแยกลงทีละช่อง
// PDF coordinate เริ่มจากมุมซ้ายล่าง

const MAPPING1 = {
  file: './template-disclosure.pdf',

  fields: {
    consentPlace: {
      page: 0,
      x: 385,
      y: 680,
      size: 9,
      maxWidth: 165
    },

    companyName: {
      page: 0,
      x: 205,
      y: 430,
      size: 10,
      maxWidth: 185
    },

    companyType: {
      page: 0,
      x: 408,
      y: 430,
      size: 10,
      maxWidth: 130
    },

    registrationDate: {
      page: 0,
      x: 340,
      y: 373,
      size: 9,
      maxWidth: 110
    },

    phoneNo: {
      page: 0,
      x: 455,
      y: 373,
      size: 9,
      maxWidth: 100
    },

    authorizedName: {
      page: 0,
      x: 251,
      y: 340,
      size: 9,
      maxWidth: 125
    },

    authorizedName2: {
      page: 0,
      x: 405,
      y: 340,
      size: 9,
      maxWidth: 130
    },

    registrarOffice: {
      page: 0,
      x: 410,
      y: 312,
      size: 9,
      maxWidth: 140
    }
  },

  registration: {
    mode: 'split',
    page: 0,
    y: 396,
    size: 10,
    centers: [
      291,
      313,
      335,
      357,
      379,
      401,
      423,
      445,
      467,
      489,
      511,
      533,
      555
    ]
  }
};
