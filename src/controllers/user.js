import userService from '../services/user';
import RootService from '../services/root';

const { processFailedResponse } = RootService;
async function createUser(req, res) {
  try {
    const { body: data } = req;
    const result = await userService.createUser({ data });
    return res.status(result.status).json(result);
  } catch (error) {
    console.error(error.message);
  }
}

async function loginUser(req, res) {
  try {
    const { body: data } = req;
    const result = await userService.loginUser({ data });
    return res.status(result.status).json(result);
  } catch (error) {
    console.error(error.message);
  }
}

async function getUserById(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      const code = 422;
      return res.status(code).json(processFailedResponse({ message: 'id is required', code }));
    }
    const result = await userService.getUserById({ id });
    return res.status(result.status).json(result);
  } catch (error) {
    console.error(error.message);
  }
}

async function updateUserById(req, res) {
  try {
    const { body: data } = req;
    const { id } = req.params;
    if (!id) {
      const code = 422;
      return res.status(code).json(processFailedResponse({ message: 'id is required', code }));
    }
    const result = await userService.updateUserById({ id, data });
    return res.status(result.status).json(result);
  } catch (error) {
    console.error(error);
  }
}

export {
  createUser, loginUser, getUserById, updateUserById,
};
