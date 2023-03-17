import express from 'express';
import sortOptionRoutes from '../../src/routes/sort-option.routes';
import request from 'supertest';

const app = express();
app.use('/sort-options', sortOptionRoutes);

describe('testing sortOption Route', () => {
  it('Get /sort-options - success', async () => {
    const { body } = await request(app).get('/sort-options');
    expect(body).toEqual([
      {
        code: 'original_title.asc',
        name: 'Title ASC',
      },
      {
        code: 'original_title.desc',
        name: 'Title DESC',
      },
      {
        code: 'vote_average.desc',
        name: 'Vote rating DESC',
      },
      {
        code: 'vote_average.asc',
        name: 'Vote rating ASC',
      },
    ]);
  });
});
