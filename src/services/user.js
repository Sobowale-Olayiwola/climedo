import userRepo from '../repository/user';
import { hashObject, verifyHash } from '../utils/encryption';
import {
  createUserSchema, loginSchema, passwordSchema, updateUserSchema,
} from '../utils/validators/user';
import RootService from './root';

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
        const message = this.filterJOIValidation(error.message);
        return this.processFailedResponse({ message, code: 412 });
      }
      const isValid = passwordSchema.validate(data.password);
      if (!isValid) {
        return this.processFailedResponse({ message: 'password is too weak', code: 412 });
      }
      data.password = await hashObject(data.password);
      const user = await userRepo.createUser({ data });
      return this.processSuccessfulResponse({ payload: user, code: 201 });
    } catch (error) {
      return this.processFailedResponse({ message: error.message, code: 500 });
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
        const message = this.filterJOIValidation(error.message);
        return this.processFailedResponse({ message, code: 412 });
      }
      const user = await userRepo.getUserByEmail({ email: data.email });
      if (!user) {
        return this.processFailedResponse({ message: 'Kindly register. User not found', code: 404 });
      }
      const passwordMatch = await verifyHash({ sentObject: data.password, accurateObject: user.password });
      if (!passwordMatch) {
        return this.processFailedResponse({ message: 'Incorrect email or password', code: 400 });
      }
      user.password = '';
      return this.processSuccessfulResponse({ message: 'successfully logged in', payload: user });
    } catch (error) {
      return this.processFailedResponse({ message: error.message, code: 500 });
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
        return this.processFailedResponse({ message: 'Kindly register. User not found', code: 404 });
      }
      return this.processSuccessfulResponse({ message: 'user found', payload: user });
    } catch (error) {
      return this.processFailedResponse({ message: error.message, code: 500 });
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
      const message = this.filterJOIValidation(error.message);
      return this.processFailedResponse({ message, code: 412 });
    }
    const user = await userRepo.updateUserById({ id, data });
    if (!user) {
      return this.processFailedResponse({ message: 'User update failed', code: 400 });
    }
    return this.processSuccessfulResponse({ message: 'User update succesful', payload: user });
  }
}
const userService = new UserService();
export default userService;
