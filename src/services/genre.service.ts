import axios from 'axios';
import NodeCache from 'node-cache';

const cache = new NodeCache();

const getGenres = async (): Promise<Genre[]> => {
  const cacheKey = 'genres';
  const cachedGenres = cache.get<Genre[]>(cacheKey);
  if (cachedGenres) {
    return cachedGenres;
  } else {
    const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}`);
    const genres = response.data;
    cache.set(cacheKey, genres);
    return genres;
  }
};

export { getGenres };
