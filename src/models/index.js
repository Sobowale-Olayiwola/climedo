import mongoose from 'mongoose';
import env from '../config/env';

const { APP_DB_URI } = env;

// TODO create env for database connection uri
export default function connectDB() {
  mongoose.connect(APP_DB_URI, (error) => {
    if (error) {
      console.log('Database connection failed ', error.message);
    } else {
      console.log('Database connection successful');
    }
  });
}
