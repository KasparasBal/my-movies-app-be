const moviePrefix = 'https://image.tmdb.org/t/p/w500';
const movieDetailsPrefix = 'https://image.tmdb.org/t/p/original';
const movieConverter = (tmdbMovie: TmdbMovie): Movie => {
  return {
    title: tmdbMovie.title,
    movieId: tmdbMovie.id,
    backdropPath: moviePrefix + tmdbMovie.backdrop_path,
    posterPath: moviePrefix + tmdbMovie.poster_path,
    voteAverage: 0 + tmdbMovie.vote_average,
    releaseDate: tmdbMovie.release_date,
  };
};

const productionCompanyConverter = (tmdbProductionCompany: TmdbProductionCompany) => {
  return {
    name: tmdbProductionCompany.name,
    id: tmdbProductionCompany.id,
    logoPath: tmdbProductionCompany.logo_path,
    originCountry: tmdbProductionCompany.origin_country,
  };
};
const productionCountryConverter = (tmdbProductionCountry: TmdbProductionCountry) => {
  return {
    name: tmdbProductionCountry.name,
    iso: tmdbProductionCountry.iso_3166_1,
  };
};
const spokenLanguageConverter = (tmdbSpokenLanguage: TmdbSpokenLanguage) => {
  return {
    name: tmdbSpokenLanguage.name,
    englishName: tmdbSpokenLanguage.english_name,
    iso: tmdbSpokenLanguage.iso_639_1,
  };
};

const movieDetailsConverter = (tmdbMovieDetails: TmdbMovieDetails): MovieDetails => {
  return {
    ...movieConverter(tmdbMovieDetails),
    budget: tmdbMovieDetails.budget,
    genres: tmdbMovieDetails.genres,
    posterPath: movieDetailsPrefix + tmdbMovieDetails.poster_path,
    backdropPath: movieDetailsPrefix + tmdbMovieDetails.backdrop_path,
    homepage: tmdbMovieDetails.homepage,
    productionCompanies: tmdbMovieDetails.production_companies.map(productionCompanyConverter),
    productionCountries: tmdbMovieDetails.production_countries.map(productionCountryConverter),
    originalTitle: tmdbMovieDetails.original_title,
    overview: tmdbMovieDetails.overview,
    originalLanguage: tmdbMovieDetails.original_language,
    voteCount: tmdbMovieDetails.vote_count,
    tagline: tmdbMovieDetails.tagline,
    status: tmdbMovieDetails.status,
    runtime: tmdbMovieDetails.runtime,
    revenue: tmdbMovieDetails.revenue,
    spokenLanguages: tmdbMovieDetails.spoken_languages.map(spokenLanguageConverter),
  };
};

export { movieConverter, movieDetailsConverter };
