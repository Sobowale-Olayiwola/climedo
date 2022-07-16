import http from 'http';
import mongoose from 'mongoose';
import app from './app';
import connectDB from './models';
import env from './config/env';

const { PORT } = env;
const server = http.createServer(app);

async function startServer() {
  connectDB();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();

// Graceful shutdown
process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  console.log('Closing http server.');
  server.close(() => {
    console.log('Http server closed.');
    // boolean means [force], see in mongoose doc
    mongoose.connection.close(false, () => {
      console.log('MongoDb connection closed.');
      process.exit(0);
    });
  });
});
