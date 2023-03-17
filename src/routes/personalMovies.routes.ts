import express from 'express';
import authenticate from '../services/security.service';
import validatePersonalMovies from '../validators/movie.validator';
import { savePersonalMovies, getPersonalMovies, deletePersonalMovies } from '../controllers/personalMovies.controller';

const router = express.Router();

router.route('/').post(authenticate, validatePersonalMovies, savePersonalMovies);
router.route('/:id').delete(authenticate, deletePersonalMovies);
router.route('/').get(authenticate, getPersonalMovies);

export default router;
