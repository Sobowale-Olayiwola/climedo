import userRepo from '../repository/user';
import { generateToken, hashObject, verifyHash } from '../utils/encryption';
import {
  createUserSchema, loginSchema, passwordSchema, updateUserSchema,
} from '../utils/validators/user';
import RootService from './root';

const { filterJOIValidation, processFailedResponse, processSuccessfulResponse } = RootService;

class UserService extends RootService {
  /**
    * This method is an implementation to handle the business logic of
    * creating and saving new users into the database.
    * @async
    * @description POST /v1/users/signup
    * @method
    * @param {object} data user input from request body
    * @returns
    */
  async createUser({ data }) {
    try {
      const { error } = createUserSchema.validate(data);
      if (error) {
        const message = filterJOIValidation(error.message);
        return processFailedResponse({ message, code: 412 });
      }
      const isValid = passwordSchema.validate(data.password);
      if (!isValid) {
        return processFailedResponse({ message: 'password is too weak', code: 412 });
      }
      const existingUser = await userRepo.getUserByEmail({ email: data.email });
      if (existingUser) {
        return processFailedResponse({ message: 'User exists with email.', code: 400 });
      }
      data.password = await hashObject(data.password);
      const user = await userRepo.createUser({ data });
      return processSuccessfulResponse({ payload: user, code: 201 });
    } catch (error) {
      return processFailedResponse({ message: error.message, code: 500 });
    }
  }

  /**
    * This method is an implementation to handle the business logic of
    * a user logging in
    * @async
    * @description POST /v1/users/login
    * @method
    * @param {object} data user input from request body
    * @returns
    */
  async loginUser({ data }) {
    try {
      const { error } = loginSchema.validate(data);
      if (error) {
        const message = filterJOIValidation(error.message);
        return processFailedResponse({ message, code: 412 });
      }
      let user = await userRepo.getUserByEmail({ email: data.email });
      if (!user) {
        return processFailedResponse({ message: 'Kindly register. User not found', code: 404 });
      }
      const passwordMatch = await verifyHash({ sentObject: data.password, accurateObject: user.password });
      if (!passwordMatch) {
        return processFailedResponse({ message: 'Incorrect email or password', code: 400 });
      }
      user = await userRepo.updateUserById({ id: user._id, data: { lastLogin: new Date() } });
      const payload = {
        id: user._id,
        role: user.role,
      };
      const token = await generateToken({ payload });
      user.token = token;
      return processSuccessfulResponse({ message: 'successfully logged in', payload: user });
    } catch (error) {
      return processFailedResponse({ message: error.message, code: 500 });
    }
  }

  /**
    * This method is an implementation to handle the business logic of
    * a user logging in
    * @async
    * @description GET /v1/users/:id
    * @method
    * @param {object} data user input from request body
    * @returns
    */
  async getUserById({ id }) {
    try {
      const user = await userRepo.getUserById({ id });
      if (!user) {
        return processFailedResponse({ message: 'Kindly register. User not found', code: 404 });
      }
      return processSuccessfulResponse({ message: 'user found', payload: user });
    } catch (error) {
      return processFailedResponse({ message: error.message, code: 500 });
    }
  }

  /**
    * This method is an implementation to handle the business logic of
    * updating a user
    * @async
    * @description PUT /v1/users/:id
    * @method
    * @param {object} data user input from request body
    * @returns
    */
  async updateUserById({ id, data }) {
    const { error } = updateUserSchema.validate(data);
    if (error) {
      const message = filterJOIValidation(error.message);
      return processFailedResponse({ message, code: 412 });
    }
    if (data.password) {
      const isValid = passwordSchema.validate(data.password);
      if (!isValid) {
        return processFailedResponse({ message: 'password is too weak', code: 412 });
      }
    }
    const user = await userRepo.updateUserById({ id, data });
    if (!user) {
      return processFailedResponse({ message: 'User update failed', code: 400 });
    }
    return processSuccessfulResponse({ message: 'User update succesful', payload: user });
  }
}
const userService = new UserService();
export default userService;
