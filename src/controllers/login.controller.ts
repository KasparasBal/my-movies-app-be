import * as loginService from '../services/login.service';
import express from 'express';

const login = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
  try {
    const token = await loginService.login(req.body);
    res.json({ token: token });
  } catch (error) {
    next(error);
  }
};

export default login;
