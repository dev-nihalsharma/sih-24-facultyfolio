const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env._PORT;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
