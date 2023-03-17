import jwt from 'jsonwebtoken';
import express from 'express';
import { UserModel } from '../models/user';

declare global {
  namespace Express {
    interface Request {
      currentUserEmail: string | undefined;
    }
  }
}

const authenticate = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], `${process.env.API_SECRET_KEY}`, function (err, decode) {
      if (err || !decode) {
        req.currentUserEmail = undefined;
        next();
      } else {
        UserModel.findOne({
          email: decode.email,
        }).exec((error, user) => {
          if (error) {
            res.status(500).send({ message: error });
          } else {
            req.currentUserEmail = user?.email;
            next();
          }
        });
      }
    });
  } else {
    req.currentUserEmail = undefined;
    next();
  }
};

export default authenticate;
