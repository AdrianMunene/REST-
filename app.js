const express = require('express');
const app = express();
const router = require('./newRoutes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', router);

app.listen(3000, () => {
    console.log('Server is listening on port 3000....')
  });