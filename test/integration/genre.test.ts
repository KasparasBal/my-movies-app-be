import axios from 'axios';
import httpStatus from 'http-status';
import supertest from 'supertest';

import app from '../../src/app';

jest.mock('axios');
const mockedAxios = axios.get as jest.Mock;

const mockedGenreResponse = {
  genres: [
    {
      id: 53,
      name: 'Thriller',
    },
    {
      id: 10752,
      name: 'War',
    },
    {
      id: 37,
      name: 'Western',
    },
  ],
};

const expectedResult = {
  genres: [
    {
      id: 53,
      name: 'Thriller',
    },
    {
      id: 10752,
      name: 'War',
    },
    {
      id: 37,
      name: 'Western',
    },
  ],
};

describe('Genre API', () => {
  const request = supertest(app);

  it('should return a list of genres', async () => {
    mockedAxios.mockResolvedValue({ data: mockedGenreResponse });
    mockedAxios.mockClear();

    const res1 = await request.get('/genres').expect(httpStatus.OK);
    expect(res1.body).toEqual(expectedResult);
    expect(axios.get).toHaveBeenCalledTimes(1);

    const res2 = await request.get('/genres').expect(httpStatus.OK);
    expect(res2.body).toEqual(expectedResult);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
