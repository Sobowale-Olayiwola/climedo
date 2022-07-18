import express from 'express';
import expressMongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';
import morgan from 'morgan';
import routes from './routes';

const app = express();

app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(morgan('combined'));
app.use(expressMongoSanitize({ allowDots: true }));
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(hpp());
// respond with "Welcome to Climedo IAM service" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Climedo IAM service' });
});

// pass the app instance to the route file
routes(app);

export default app;
