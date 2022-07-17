/* eslint-disable no-unused-vars */
import sinon from 'sinon';

const createUser = sinon.spy(({ data }) => {
  if (!Object.keys(data).length) {
    return { failed: true, error: 'Just a random error' };
  }
  return {
    _id: '62d31ad3f51c80c444423f83',
    firstName: 'Olayiwola',
    lastName: 'Sobowale',
    email: 'golang@gmail.com',
    role: 'regular',
  };
});

const getUserById = sinon.spy(({ id }) => {
  if (id !== '62d31ad3f51c80c444423f83') {
    return null;
  }
  return {
    _id: '62d31ad3f51c80c444423f83',
    firstName: 'Olayiwola',
    lastName: 'Sobowale',
    email: 'golang@gmail.com',
    role: 'regular',
  };
});

const getUserByEmail = sinon.spy(({ email }) => {
  if (email !== 'golang@gmail.com') {
    return null;
  }
  return {
    _id: '62d31ad3f51c80c444423f83',
    firstName: 'Olayiwola',
    lastName: 'Sobowale',
    email: 'golang@gmail.com',
    role: 'regular',
  };
});
const updateUserById = sinon.spy(({ id, data }) => {
  if (id !== '62d31ad3f51c80c444423f83') {
    return null;
  }
  return {
    _id: '62d31ad3f51c80c444423f83',
    firstName: 'Olayiwola',
    lastName: 'Sobowale',
    email: 'golang@gmail.com',
    role: 'regular',
  };
});
export {
  createUser, getUserByEmail, getUserById, updateUserById,
};
