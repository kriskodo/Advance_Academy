import makeRequest from './makeRequest';

const apiMovies = {
  getAll: () => makeRequest('/api/v1/movies', 'GET'),
  getById: (movieId) => makeRequest(`/api/v1/movies/${movieId}`, 'GET'),
  createMovie: (title, description, posterUrl) => makeRequest('/api/v1/movies', 'POST', {
    title,
    description,
    posterUrl,
  }),
  editMovie: (movieId, title, description, posterUrl) => makeRequest(`/api/v1/movies/${movieId}`, 'PUT', {
    title,
    description,
    posterUrl,
  }),
  deleteMovie: (movieId) => makeRequest(`/api/v1/movies/${movieId}`, 'DELETE'),
  rateMovie: (movieId, rating) => makeRequest(`/api/v1/movies/${movieId}/rate`, 'POST', { rating }),
  commentMovie: (movieId, author, content) => makeRequest(`/api/v1/movies/${movieId}/comment`, 'POST', {
    author,
    content,
  }),
};

export default apiMovies;
