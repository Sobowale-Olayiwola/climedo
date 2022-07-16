import express from 'express';
import expressMongoSanitize from 'mongo-express-sanitize';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';
import routes from './routes';

const app = express();

app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(expressMongoSanitize());
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(hpp());

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to IAM service' });
});

// pass the app instance to the route file
routes(app);

export default app;
