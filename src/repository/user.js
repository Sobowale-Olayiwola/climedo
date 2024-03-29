import User from '../models/user';

class UserRepository {
  async createUser({ data }) {
    try {
      const user = await User.create(data);
      user.password = '';
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUserById({ id }) {
    try {
      const user = await User.findById(id).select('-password').lean();
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUserByEmail({ email }) {
    try {
      const user = await User.findOne({ email }).lean();
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateUserById({ id, data }) {
    try {
      const result = await User.findByIdAndUpdate(id, data, { new: true }).select('-password').lean();
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

const userRepo = new UserRepository();
export default userRepo;
