import express from 'express';
import { UserModel } from '../models/user';
import * as signUpService from '../services/sign-up.service';

const signUp = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
  try {
    await signUpService.signUp(req.body);
    const user = await UserModel.findOne({ email: req.body.email });
    res.send({ id: user?._id, name: user?.name, email: user?.email });
  } catch (error) {
    next(error);
  }
};

export { signUp };
