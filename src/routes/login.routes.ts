import express from 'express';
import { validateUserLogin } from '../validators/user-login.validator';
import login from '../controllers/login.controller';
const router = express.Router();

router.route('/').post(validateUserLogin, login);

export default router;
