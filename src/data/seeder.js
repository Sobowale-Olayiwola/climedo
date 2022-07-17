import mongoose from 'mongoose';
import { genSalt, hash } from 'bcrypt';
import User from '../models/user';

mongoose.connect('mongodb://mongo:27017/climedo', (error) => {
  if (error) {
    console.log('Database connection failed ', error.message);
  } else {
    console.log('Database connection successful');
  }
});

const seedUser = [
  {
    firstName: 'Olayiwola',
    lastName: 'Sobowale',
    role: 'admin',
    password: 'Password@007',
    email: 'fake@gmail.com',
  },
  {
    firstName: 'Tom',
    lastName: 'Jones',
    role: 'regular',
    password: 'Password@007',
    email: 'golang@gmail.com',
  },
  {
    firstName: 'Mike',
    lastName: 'John',
    role: 'regular',
    password: 'Password@007',
    email: 'node@yahoo.com',
  },
  {
    firstName: 'Charles',
    lastName: 'Kent',
    role: 'regular',
    password: 'Password@007',
    email: 'kent@example.com',
  },
];

const seedDB = async () => {
  seedUser.forEach(async (e) => {
    const salt = await genSalt(Number(10));
    const hashedObject = await hash(e.password, salt);
    e.password = hashedObject;
  });
  await User.deleteMany({});
  await User.insertMany(seedUser);
};

seedDB().then(() => {
  mongoose.connection.close();
});
