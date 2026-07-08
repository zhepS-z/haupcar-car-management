// test-connection.js (ลบทิ้งได้หลังทดสอบผ่าน)
const mysql = require('mysql2/promise');
const fs = require('fs');
require('dotenv').config();

(async () => {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { ca: fs.readFileSync(process.env.DB_CA_PATH) },
  });
  const [rows] = await conn.query('SELECT 1 + 1 AS result');
  console.log('เชื่อมต่อสำเร็จ:', rows);
  await conn.end();
})();