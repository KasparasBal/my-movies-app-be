import express from 'express';

import { getMovies, getMovie } from '../controllers/movie.controller';

const router = express.Router();

router.route('/').get(getMovies);
router.route('/:id').get(getMovie);

export default router;
