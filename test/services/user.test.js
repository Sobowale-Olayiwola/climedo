/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import { expect } from 'chai';
import {
  createUser, getUserByEmail, getUserById, updateUserById,
} from '../repository/user.test';
import userService from '../../src/services/user';
import UserRepo from '../../src/repository/user';

const bcryptSaltMock = sinon.spy((object) => '%^@%%@jdhfh');
const bcryptHashMock = sinon.spy((payload) => 'tdyfhyhfdh356784949i39fhjfhyr7hf');
const bcryptCompareMock = sinon.spy(() => true);

const encryption = proxyquire('../../src/utils/encryption', {
  bcrypt: {
    genSalt: bcryptSaltMock,
    hash: bcryptHashMock,
    compare: bcryptCompareMock,
  },
});

const UserServiceEncrypt = proxyquire('../../src/services/user', {
  '../../src/utils/encryption': encryption,
});

describe('Test UserService', () => {
  beforeEach(() => {
    UserRepo.createUser = createUser;
    UserRepo.getUserByEmail = getUserByEmail;
    UserRepo.getUserById = getUserById;
    UserRepo.updateUserById = updateUserById;
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Create User', () => {
    it('Returns validation error', async () => {
      const data = {
        firstName: 'Olayiwola',
        lastName: 'Sobowale',
        role: 'regular',
        password: 'Password@007',
      };
      const result = await userService.createUser({ data });
      expect(result.error).to.equal('email is required');
      expect(result.status).to.equal(412);
    });
    it('Returns weak password error', async () => {
      const data = {
        firstName: 'Olayiwola',
        lastName: 'Sobowale',
        role: 'regular',
        email: 'fake@gmail.com',
        password: 'password',
      };
      const result = await userService.createUser({ data });
      expect(result.error).to.equal('password is too weak');
      expect(result.status).to.equal(412);
    });
    it('Returns error for existing email', async () => {
      const data = {
        firstName: 'Olayiwola',
        lastName: 'Sobowale',
        role: 'regular',
        email: 'golang@gmail.com',
        password: 'Password@007',
      };
      const result = await userService.createUser({ data });
      expect(result.error).to.equal('User exists with email.');
      expect(result.status).to.equal(400);
    });
    it('Successfully creates a user', async () => {
      const data = {
        firstName: 'Olayiwola',
        lastName: 'Sobowale',
        role: 'regular',
        email: 'new@gmail.com',
        password: 'Password@007',
      };
      const UserServiceInstance = UserServiceEncrypt.default;
      const result = await UserServiceInstance.createUser({ data });
      expect(result.error).to.equal(null);
      expect(result.status).to.equal(201);
    });
  });
  describe('Login User', () => {
    it('Returns validation error', async () => {
      const data = {
        password: 'Password@007',
      };
      const result = await userService.loginUser({ data });
      expect(result.error).to.equal('email is required');
      expect(result.status).to.equal(412);
    });
    it('Returns error for non-existing user', async () => {
      const data = {
        email: 'donotexist@gmail.com',
        password: 'Password@007',
      };
      const result = await userService.loginUser({ data });
      expect(result.error).to.equal('Kindly register. User not found');
      expect(result.status).to.equal(404);
    });
    it('Successfully logs a user', async () => {
      const data = {
        email: 'golang@gmail.com',
        password: 'Password@007',
      };
      const UserServiceInstance = UserServiceEncrypt.default;
      const result = await UserServiceInstance.loginUser({ data });
      expect(result.error).to.equal(null);
      expect(result.message).to.equal('successfully logged in');
      expect(result.status).to.equal(200);
    });
  });
  describe('Get User by Id', () => {
    it('Returns error for non-existing user id', async () => {
      const id = 'abcdefghytidodkd';
      const result = await userService.getUserById({ id });
      expect(result.error).to.equal('Kindly register. User not found');
    });
    it('Successfully return existing user by id', async () => {
      const id = '62d31ad3f51c80c444423f83';
      const result = await userService.getUserById({ id });
      expect(result.message).to.equal('user found');
      expect(result.status).to.equal(200);
    });
  });
  describe('Update User by Id', () => {
    it('Returns validation error', async () => {
      const id = '62d31ad3f51c80c444423f83';
      const data = {
        firstName: 'Olayiwola',
        lastName: 'Sobowale',
        role: 'regular',
        password: 'Password@007',
        fakeField: '',
      };
      const result = await userService.updateUserById({ id, data });
      expect(result.error).to.equal('fakeField is not allowed');
      expect(result.status).to.equal(412);
    });
    it('Returns weak password validation error', async () => {
      const id = '62d31ad3f51c80c444423f83';
      const data = {
        firstName: 'Olayiwola',
        lastName: 'Sobowale',
        role: 'regular',
        password: 'password',
      };
      const result = await userService.updateUserById({ id, data });
      expect(result.error).to.equal('password is too weak');
      expect(result.status).to.equal(412);
    });
    it('Returns error for non-existing user id', async () => {
      const data = {
        firstName: 'Olayiwola',
        lastName: 'Sobowale',
        role: 'regular',
        password: 'Password@007',
      };
      const id = 'abcdefghytidodkd';
      const result = await userService.updateUserById({ id, data });
      expect(result.error).to.equal('User update failed');
      expect(result.status).to.equal(400);
    });
    it('Succesfully updates existing user by id', async () => {
      const data = {
        firstName: 'Olayiwola',
        lastName: 'Sobowale',
        role: 'regular',
        password: 'Password@007',
      };
      const id = '62d31ad3f51c80c444423f83';
      const result = await userService.updateUserById({ id, data });
      expect(result.error).to.equal(null);
      expect(result.message).to.equal('User update succesful');
      expect(result.status).to.equal(200);
    });
  });
});
