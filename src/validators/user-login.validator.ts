import { body } from 'express-validator';

const validateUserLogin = [body('email').isEmail(), body('password').notEmpty().isLength({ min: 8 })];

export { validateUserLogin };
