const express = require('express');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerDoc = require('./swagger.json');
const api = require('./src/api');

const app = express();

const MONGOURI = 'mongodb+srv://loctran:mpVDhsrReqF6Y2m@cluster0.ze9lh.mongodb.net/bookStore';

app.use(cors());
app.use(express.json());
app.use(express.static('images'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use('/api/v1', api);

app.use((req, res) => {
  res.status(404).json({
    message: 'Not found',
  });
});

app.use((err, req, res, next) => {
  let {statusCode} = err;
  if (!statusCode) {
    statusCode = 500;
  }
  console.log(err);
  res.status(statusCode).json({
    message: err.message,
  });
});

mongoose
  .connect(MONGOURI)
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
