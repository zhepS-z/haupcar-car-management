const db = require('../config/db');

//จัดการข้อมูลรถ 
const CarModel = {

  //ดึงข้อมูลรถทั้งหมด  
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM cars ORDER BY id DESC');
    return rows;
  },

  //ดึงข้อมูลรถตาม id
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM cars WHERE id = ?', [id]);
    return rows[0];
  },

  //เพิ่มข้อมูลรถ
  create: async (data) => {
    const { registration_number, brand, model, notes } = data;
    const [result] = await db.query(
      'INSERT INTO cars (registration_number, brand, model, notes) VALUES (?, ?, ?, ?)',
      [registration_number, brand, model, notes]
    );
    return result.insertId;
  },

  //อัพเดตข้อมูลรถตาม id
  update: async (id, data) => {
    const { registration_number, brand, model, notes } = data;
    await db.query(
      'UPDATE cars SET registration_number=?, brand=?, model=?, notes=? WHERE id=?',
      [registration_number, brand, model, notes, id]
    );
  },

  //ลบข้อมูลรถตาม id
  remove: async (id) => {
    await db.query('DELETE FROM cars WHERE id = ?', [id]);
  },
};

module.exports = CarModel;