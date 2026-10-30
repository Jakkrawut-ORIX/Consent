// พิกัดสำหรับ template-application.pdf เท่านั้น
// PDF coordinate เริ่มจากมุมซ้ายล่าง
const MAPPING1 = {
  file: './template-application.pdf',
  output: 'tolc-application-filled.pdf',
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
    centers: [228, 254, 280, 306, 332, 358, 384, 410, 436, 462, 488, 514, 540]
  }
};
