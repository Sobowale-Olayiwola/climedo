import express from 'express';
import {
  createUser, getUserById, updateUserById,
} from '../controllers/user';
import { verifyUserAction, verifyUserToken } from '../middlewares/auth';

const router = express.Router();

router.post('/signup', createUser);

router.get('/:id', verifyUserToken, verifyUserAction, getUserById);

router.put('/:id', verifyUserToken, verifyUserAction, updateUserById);

export default router;
