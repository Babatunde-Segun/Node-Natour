const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');
// const dotenv = require('dotenv');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then((con) => {
  console.log('DB connection successful');
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  // const mongoose = require('mongoose');
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLE REJECTION, Shutting down....');
  server.close(() => {
    process.exit(1);
  });
});
