import { MovieModel } from '../models/movie';
import { PAGE_SIZE } from '../commons/index';

const savePersonalMovies = async (movie: Movie, currentUserEmail: string | undefined): Promise<void> => {
  if (currentUserEmail) {
    const movieWithEmail = new MovieModel({ email: currentUserEmail, ...movie });
    if (!(await MovieModel.findOne({ movieId: movie.movieId, email: currentUserEmail }))) {
      await movieWithEmail.save();
    } else {
      throw new Error('Movie already exists!');
    }
  } else {
    throw new Error('User email is not provided');
  }
};

const getPersonalMovies = async (currentUserEmail: string | undefined, page: number): Promise<Movies> => {
  if (currentUserEmail) {
    const { docs, totalPages } = await MovieModel.paginate(
      { email: currentUserEmail },
      { offset: (page - 1) * PAGE_SIZE, limit: PAGE_SIZE },
    );

    return {
      page: page,
      totalPages: totalPages,
      movies: docs,
    };
  } else {
    throw new Error('User email is not provided');
  }
};

const deletePersonalMovies = async (id: number, currentUserEmail: string | undefined) => {
  if (currentUserEmail) {
    await MovieModel.deleteOne({ movieId: id, email: currentUserEmail });
  }
};

export { savePersonalMovies, getPersonalMovies, deletePersonalMovies };
