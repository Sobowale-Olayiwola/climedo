import rateLimit from 'express-rate-limit';
import { loginUser } from '../controllers/user';
import userRouteHandler from './user';

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const loginAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 login requests per `window` (here, per hour)
  message: 'Too many accounts created from this IP, please try again after an hour',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
export default function routes(app) {
  app.use('/api/v1/users/login', loginAccountLimiter, loginUser);
  app.use('/api/v1/users', apiLimiter, userRouteHandler);
}
