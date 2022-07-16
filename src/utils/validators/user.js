import Joi from 'joi';
import PasswordValidator from 'password-validator';
import constants from '../../config/constants';

const { USER_ROLES } = constants;

const createUserSchema = Joi.object({
  firstName: Joi.string().required().label('firstName'),
  lastName: Joi.string().required().label('lastName'),
  email: Joi.string().email().required().label('email'),
  password: Joi.string().min(6).max(100).required()
    .label('password'),
  middleName: Joi.string().label('middleName'),
  role: Joi.string().valid(...USER_ROLES).required().label('role'),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().label('email'),
  password: Joi.string().min(6).max(100).required()
    .label('password'),
});

const passwordSchema = new PasswordValidator();
passwordSchema.is().min(8) // Minimum length 8
  .is().max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces(); // Should not have spaces

const updateUserSchema = Joi.object({
  firstName: Joi.string().label('firstName'),
  lastName: Joi.string().label('lastName'),
  email: Joi.string().email().label('email'),
  password: Joi.string().min(6).max(100)
    .label('password'),
  middleName: Joi.string().label('middleName'),
  role: Joi.string().valid(...USER_ROLES).label('role'),
});

export {
  createUserSchema, updateUserSchema, passwordSchema, loginSchema,
};
