const app = require('./app');

console.log(process.env);

const port = 4000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
