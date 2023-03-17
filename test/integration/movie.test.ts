import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../src/app';
import { UserModel } from '../../src/models/user';
import { sha256 } from 'js-sha256';

let mongoServer: MongoMemoryServer;
let mongoUri: string;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  try {
    mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri);
  } catch (err) {
    console.error(err);
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('POST /personal-movies', () => {
  test('should save a personal movie successfully', async () => {
    const user = new UserModel({
      name: 'TestAccount',
      email: 'test@example.com',
      password: sha256('Password123%@@#'),
    });
    await user.save();

    const loginResponse = await request(app).post('/login').send({
      email: 'test@example.com',
      password: 'Password123%@@#',
    });
    const token = loginResponse.body.token;

    const movie: Movie = {
      movieId: 505642,
      title: 'Black Panther: Wakanda Forever',
      releaseDate: '2022-11-09',
      backdropPath: 'https://image.tmdb.org/t/p/w500/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg',
      posterPath: 'https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg',
      voteAverage: 7.3,
    };
    const response = await request(app).post('/personal-movies').send(movie).set('Authorization', `JWT ${token}`);
    expect(response.status).toBe(200);
    expect(response.text).toBe('{"status":"success"}');

    const savedMovie = await mongoose.model<Movie>('Movie').findOne({ email: 'test@example.com' });
    expect(savedMovie).not.toBeNull();
    expect(savedMovie!.movieId).toBe(movie.movieId);
  });

  test('should return an error if a movie already exists in the database', async () => {
    const loginResponse = await request(app).post('/login').send({
      email: 'test@example.com',
      password: 'Password123%@@#',
    });
    const token = loginResponse.body.token;

    const movie: Movie = {
      movieId: 505642,
      title: 'Black Panther: Wakanda Forever',
      releaseDate: '2022-11-09',
      backdropPath: 'https://image.tmdb.org/t/p/w500/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg',
      posterPath: 'https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg',
      voteAverage: 7.3,
    };
    const response = await request(app).post('/personal-movies').send(movie).set('Authorization', `JWT ${token}`);
    expect(response.body).toEqual({ error: 'Movie already exists!' });

    const savedMovie = await mongoose.model<Movie>('Movie').findOne({ email: 'test@example.com' });
    expect(savedMovie).not.toBeNull();
    expect(savedMovie!.movieId).toBe(movie.movieId);
  });

  test('should return an error if the user in not authorized', async () => {
    const movie: Movie = {
      movieId: 505642,
      title: 'Black Panther: Wakanda Forever',
      releaseDate: '2022-11-09',
      backdropPath: 'https://image.tmdb.org/t/p/w500/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg',
      posterPath: 'https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg',
      voteAverage: 7.3,
    };
    const response = await request(app).post('/personal-movies').send(movie);
    expect(response.body).toEqual({ error: 'User email is not provided' });

    const savedMovie = await mongoose.model<Movie>('Movie').findOne({ email: 'test@example.com' });
    expect(savedMovie).not.toBeNull();
    expect(savedMovie!.movieId).toBe(movie.movieId);
  });
});

describe('GET /personal-movies', () => {
  test('should get all personal movies successfully', async () => {
    const loginResponse = await request(app).post('/login').send({
      email: 'test@example.com',
      password: 'Password123%@@#',
    });
    const token = loginResponse.body.token;

    const response = await request(app).get('/personal-movies').set('Authorization', `JWT ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.page).toBe(1);
    expect(response.body.totalPages).toBe(1);
    expect(Array.isArray(response.body.movies)).toBe(true);
    expect(response.body.movies).toHaveLength(1);
  });
});

describe('DELETE /personal-movies', () => {
  test('should delete one personal movie successfully', async () => {
    const loginResponse = await request(app).post('/login').send({
      email: 'test@example.com',
      password: 'Password123%@@#',
    });
    const token = loginResponse.body.token;

    const response = await request(app).delete('/personal-movies/505642').set('Authorization', `JWT ${token}`);
    expect(response.status).toBe(200);
    expect(response.text).toBe('{"status":"success"}');
  });
});
