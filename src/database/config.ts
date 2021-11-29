import mongoose, { ConnectionOptions } from 'mongoose';
import { config } from '../config/config';

const URI = config.MONGO_URI;

const dbOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose.connect(URI, dbOptions);

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('Mongodb connection start');
});

connection.on('error', err => {
  console.log(err);
  process.exit(0);
});
