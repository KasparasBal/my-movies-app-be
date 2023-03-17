import { body } from 'express-validator';
import { UserModel } from '../models/user';

const validateUserSignUp = [
  body('name').isLength({ min: 3, max: 50 }),
  body('email')
    .isEmail()
    .normalizeEmail()
    .custom(
      (email) =>
        new Promise((resolve, reject) => {
          UserModel.findOne({ email })
            .then((emailExists) => {
              if (emailExists) {
                reject(new Error('Email exists!'));
              } else {
                resolve(true);
              }
            })
            .catch((err) => reject(err));
        }),
    ),
  body('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/),
];

export default validateUserSignUp;
