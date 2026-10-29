# PDF GitHub Pages Simple

เวอร์ชันง่ายที่สุด ไม่มี Node.js และไม่มี server.js ทุกอย่างทำงานใน Browser

## อัปโหลดไป GitHub
1. สร้าง Repository ใหม่
2. เลือก Add file > Upload files
3. ลาก `index.html`, `README.md` และโฟลเดอร์ `assets` เข้า Branch `main`
4. Settings > Pages > Deploy from a branch
5. เลือก Branch `main` และ Folder `/ (root)` แล้ว Save

## โครงสร้าง
```text
index.html
README.md
assets/
  template-application.pdf
  template-disclosure.pdf
  NotoSansThai-Regular.woff
```

## ปรับพิกัด
แก้ตัวแปร `MAPPING` ใน `index.html` พิกัดเริ่มจากมุมซ้ายล่างของ PDF
