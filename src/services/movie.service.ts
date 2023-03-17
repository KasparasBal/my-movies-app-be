import express from 'express';
import axios from 'axios';
import NodeCache from 'node-cache';
import { movieConverter, movieDetailsConverter } from '../converters/movie.converter';

const cache = new NodeCache();

const getMovies = async (req: express.Request): Promise<Movies> => {
  const page = req.query.page || '1';
  const cacheKey = `movies_${page}`;
  const cachedMovies = cache.get<Movies>(cacheKey);

  if (cachedMovies) {
    return cachedMovies;
  } else {
    const response = await axios(
      `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=${page}&vote_count.gte=1000&api_key=${process.env.API_KEY}`,
    );
    const data: TmdbMovies = response.data;
    const movies: Movies = {
      page: data.page,
      totalPages: data.total_pages,
      movies: data.results.map(movieConverter),
    };
    cache.set(cacheKey, movies);
    return movies;
  }
};

const filterMovies = async (page: number, genres?: string, sort?: string): Promise<Movies> => {
  const response = await axios(
    `https://api.themoviedb.org/3/discover/movie?sort_by=${sort}&with_genres=${genres}&page=${page}&vote_count.gte=1000&api_key=${process.env.API_KEY}`,
  );
  const data: TmdbMovies = response.data;
  const movies: Movies = {
    page: data.page,
    totalPages: data.total_pages,
    movies: data.results.map(movieConverter),
  };
  return movies;
};

const getMovie = async (req: express.Request): Promise<MovieDetails> => {
  const movieId = req.params.id;
  const cacheKey = `movieDetails_${movieId}`;
  const cachedMovieDetails = cache.get<MovieDetails>(cacheKey);

  if (cachedMovieDetails) {
    return cachedMovieDetails;
  } else {
    const response = await axios(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}`);
    const data: TmdbMovieDetails = response.data;
    const movie: MovieDetails = movieDetailsConverter(data);
    cache.set(cacheKey, movie);
    return movie;
  }
};

const searchByMoviesTitle = async (page: number, title: string): Promise<Movies> => {
  const response = await axios(
    `https://api.themoviedb.org/3/search/movie?query=${title}&page=${page}&api_key=${process.env.API_KEY}`,
  );
  const data: TmdbMovies = response.data;
  const movies: Movies = {
    page: data.page,
    totalPages: data.total_pages,
    movies: data.results.map(movieConverter),
  };
  return movies;
};

export { getMovies, getMovie, searchByMoviesTitle, filterMovies };
