import { UserModel } from '../models/user';
import { sha256 } from 'js-sha256';

const signUp = async (userData: User): Promise<void> => {
  const user = new UserModel({ ...userData, password: sha256(userData.password) });
  await user.save();
};

export { signUp };
