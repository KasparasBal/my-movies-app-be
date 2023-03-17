import express from 'express';

import { getSortOptions } from '../controllers/sort-option.controller';

const router = express.Router();

router.route('/').get(getSortOptions);

export default router;
