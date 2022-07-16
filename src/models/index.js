import mongoose from 'mongoose';

const { APP_DB_URI } = process.env;

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
