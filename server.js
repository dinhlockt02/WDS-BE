const express = require('express');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const swaggerDoc = require('./swagger.json');
const api = require('./src/api');

const app = express();

app.use(cors());
app.use(express.json());

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
  res.status(statusCode).json({
    message: err.message,
  });
});

app.listen(3000, () => {
  console.log('Listen on port 3000');
});
