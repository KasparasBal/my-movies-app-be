import express from 'express';
import validateUserSignUp from '../validators/user-sign-up.validator';
import { signUp } from '../controllers/sign-up.controller';

const router = express.Router();

router.route('/').post(validateUserSignUp, signUp);

export default router;
