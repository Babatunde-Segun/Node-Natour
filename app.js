const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res
    .status(400)
    .json({ message: 'Hello from the server side!', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.send('You can send to this endpoint...');
});

const port = 4000;
app.listen(port, () => {
  console.log(`App running on prot ${port}...`);
});
