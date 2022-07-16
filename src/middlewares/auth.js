import { decodeToken } from '../utils/encryption';
import RootService from '../services/root';

const { processFailedResponse } = RootService;

async function verifyUserToken(req, res, next) {
  try {
    let bearerToken;
    if (req.headers.authorization) {
      [, bearerToken] = req.headers.authorization.split(' ');
    }
    if (!bearerToken) {
      const code = 401;
      return res.status(code).json(processFailedResponse({ message: 'Kindly provide Bearer token', code }));
    }
    const decoded = await decodeToken(bearerToken);

    // Append the parameters to the req object
    req.userId = decoded.id;
    req.role = decoded.role;

    return next();
  } catch (error) {
    const code = 401;
    return res.status(code).json(processFailedResponse({ message: error.message, code }));
  }
}

async function verifyUserAction(req, res, next) {
  const { id } = req.params;
  const { userId, role } = req;
  if (userId === id || role === 'admin') {
    return next();
  }
  const code = 401;
  return res.status(code).json(processFailedResponse({ message: 'Not enough priviledges', code }));
}

export { verifyUserToken, verifyUserAction };
