import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const movieSchema = new mongoose.Schema({
  email: String,
  movieId: Number,
  title: String,
  releaseDate: String,
  backdropPath: String,
  posterPath: String,
  voteAverage: Number,
}).plugin(mongoosePaginate);

export const MovieModel = mongoose.model<Movie>('Movie', movieSchema);
