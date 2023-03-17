import express from 'express';

import { getGenres } from '../controllers/genre.controller';

const router = express.Router();

router.route('/').get(getGenres);

export default router;
