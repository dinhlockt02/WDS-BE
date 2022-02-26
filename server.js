const express = require('express');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerDoc = require('./swagger.json');
const api = require('./src/api');

const app = express();

const MONGOURI = process.env.MONGOURI;

app.use(cors());
app.use(express.json());
app.use(express.static('images'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


app.use('/api/v1', api);

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

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
  res.status(statusCode).json({
    message: err.message,
  });
});

mongoose
  .connect(MONGOURI)
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch(err => {
    console.log(err);
  });
