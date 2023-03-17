import { sha256 } from 'js-sha256';
import { UserModel } from '../models/user';
import jwt from 'jsonwebtoken';

const login = async (userLogin: UserLogin): Promise<string> => {
  const user = await UserModel.findOne({ email: userLogin.email });
  if (!user) {
    throw new Error('User not found');
  }
  if (sha256(userLogin.password) === user.password) {
    const token = jwt.sign(
      {
        email: user.email,
      },
      `${process.env.API_SECRET_KEY}`,
      {
        expiresIn: process.env.EXPIRE_TIME,
      },
    );
    return token;
  } else {
    throw new Error('Invalid password');
  }
};

export { login };
