const CarModel = require('../models/car.model');

//ดึงข้อมูลรถทั้งหมด
exports.getAllCars = async (req, res, next) => {
  try {
    const cars = await CarModel.getAll();
    res.json(cars);
  } catch (err) { next(err); }
};

//เพิ่มข้อมูลรถใหม่
exports.createCar = async (req, res, next) => {
  try {
    const id = await CarModel.create(req.body);
    res.status(201).json({ id, message: 'Car created successfully' });
  } catch (err) { next(err); }
};

//ดึงข้อมูลรถตาม id
exports.getCar = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(`[getCar] requested id=${id}`);
    const car = await CarModel.getById(id);
    console.log('[getCar] db result=', car);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (err) { next(err); }
};

//แก้ไขข้อมูลรถตาม id
exports.updateCar = async (req, res, next) => {
  try {
    const car = await CarModel.getById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    await CarModel.update(req.params.id, req.body);
    res.json({ message: 'Car updated successfully' });
  } catch (err) { next(err); }
};

//ลบข้อมูลรถตาม id
exports.deleteCar = async (req, res, next) => {
  try {
    const car = await CarModel.getById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    await CarModel.remove(req.params.id);
    res.json({ message: 'Car deleted successfully' });
  } catch (err) { next(err); }
};