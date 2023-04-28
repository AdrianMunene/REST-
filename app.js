const express = require('express');
const app = express();
const PORT = 3000;
const router = require('./routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', router);

app.listen(PORT || 42069, () => {
    console.log(`Server is listening on port ${PORT}....`);
  });