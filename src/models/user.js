import mongoose from 'mongoose';
import constants from '../config/constants';

const { USER_ROLES } = constants;
const { model, Schema } = mongoose;

const userSchema = new Schema(
  {
    middleName: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    lastLogin: {
      type: Date,
    },
    role: {
      type: String,
      enum: [...USER_ROLES],
    },
  },
  {
    timestamps: true,
  },
);
const User = model('User', userSchema);
export default User;
