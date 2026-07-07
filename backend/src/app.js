const express = require('express');
const cors = require('cors');
const carRoutes = require('./routes/car.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/cars', carRoutes);

app.use(errorHandler);

module.exports = app;