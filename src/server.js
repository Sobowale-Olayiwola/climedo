import http from 'http';
import mongoose from 'mongoose';
import app from './app';
import connectDB from './models';
import env from './config/env';

const { NODE_ENV } = process.env;
const { PORT, APP_NAME } = env;
const server = http.createServer(app);

async function startServer() {
  connectDB();

  server.listen(PORT, () => {
    if (NODE_ENV === 'production') {
      console.log(`😃 ${APP_NAME} is LIVE on port ${PORT}`);
    } else {
      console.log(`🔥 Development Server is running at http://localhost:${PORT}`);
    }
  });
}

startServer();

// Graceful shutdown
process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  console.log('Closing http server.');
  server.close(() => {
    console.log('Http server closed.');
    mongoose.connection.close(false, () => {
      console.log('MongoDb connection closed.');
      process.exit(0);
    });
  });
});
