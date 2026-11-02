// MAPPING1: template-disclosure.pdf
// หนังสือให้ความยินยอม
// ทะเบียนนิติบุคคลแยกลงทีละช่อง
// PDF coordinate เริ่มจากมุมซ้ายล่าง

const MAPPING1 = {
  file: './template-disclosure.pdf',

  fields: {
    consentPlace: {
      page: 0,
      x: 386,
      y: 724,
      size: 10,
      maxWidth: 165
    },

    companyName: {
      page: 0,
      x: 164,
      y: 514,
      size: 10,
      maxWidth: 185
    },

    companyType: {
      page: 0,
      x: 442,
      y: 514,
      size: 10,
      maxWidth: 130
    },

    registrationDate: {
      page: 0,
      x: 138,
      y: 472,
      size: 10,
      maxWidth: 110
    },

    phoneNo: {
      page: 0,
      x: 420,
      y: 472,
      size: 10,
      maxWidth: 100
    },

    authorizedName: {
      page: 0,
      x: 96,
      y: 450,
      size: 10,
      maxWidth: 125
    },

    authorizedName2: {
      page: 0,
      x: 340,
      y: 450,
      size: 10,
      maxWidth: 130
    },

    registrarOffice: {
      page: 0,
      x: 410,
      y: 430,
      size: 10,
      maxWidth: 140
    }
  },

  registration: {
    mode: 'split',
    page: 0,
    y: 490,
    size: 10,
    centers: [
      248,
      276,
      298,
      320,
      342,
      372,
      394,
      416,
      438,
      462,
      490,
      512,
      538
    ]
  }
};
