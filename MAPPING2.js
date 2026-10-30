// พิกัดสำหรับ template-disclosure.pdf เท่านั้น
// PDF coordinate เริ่มจากมุมซ้ายล่าง
const MAPPING2 = {
  file: './template-disclosure.pdf',
  output: 'disclosure-consent-filled.pdf',
  fields: {
    companyName:     { page: 0, x: 205, y: 430, size: 10, maxWidth: 185 },
    companyType:     { page: 0, x: 408, y: 430, size: 10, maxWidth: 130 },
    phoneNo:         { page: 0, x: 355, y: 373, size: 10, maxWidth: 190 },
    authorizedName:  { page: 0, x: 251, y: 340, size: 9, maxWidth: 125 },
    authorizedName2: { page: 0, x: 405, y: 340, size: 9, maxWidth: 130 },
    registrarOffice: { page: 0, x: 410, y: 312, size: 9, maxWidth: 140 }
  },
  registration: {
    page: 0,
    y: 396,
    size: 10,
    centers: [291, 313, 335, 357, 379, 401, 423, 445, 467, 489, 511, 533, 555]
  }
};
