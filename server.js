const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNHANDLED EXCPTION! Shutting down');
  console.log(err.name, err.message, 'test');
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
// old way just use the one below instead
// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('DB connection established'));

const connectDatabase = async () => {
  try {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useUnifiedTopology', true);

    await mongoose.connect(DB);

    console.log('DB connection established');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDatabase();

const port = process.env.PORT;
const server = app.listen(port, () =>
  console.log(`listening on port ${port}...`)
);

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down');
  console.log(err.name, err.message, 'test2');
  server.close(() => process.exit(1));
});
