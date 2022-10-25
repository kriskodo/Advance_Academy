import makeRequest from './makeRequest';

const apiMovies = {
	getAll: () => {
		return makeRequest('/api/v1/movies', 'GET');
	},
	getById: (movieId) => {
		return makeRequest(`/api/v1/movies/${movieId}`, 'GET');
	},
	createMovie: (title, description, posterUrl) => {
		return makeRequest(`/api/v1/movies`, 'POST', {
			title,
			description,
			posterUrl,
		});
	},
	editMovie: (movieId, title, description, posterUrl) => {
		return makeRequest(`/api/v1/movies/${movieId}`, 'PUT', {
			title,
			description,
			posterUrl,
		});
	},
	deleteMovie: (movieId) => {
		return makeRequest(`/api/v1/movies/${movieId}`, 'DELETE');
	},
	rateMovie: (movieId, rating) => {
		return makeRequest(`/api/v1/movies/${movieId}/rate`, 'POST', { rating });
	},
	commentMovie: (movieId, author, content) => {
		return makeRequest(`/api/v1/movies/${movieId}/comment`, 'POST', {
			author,
			content,
		});
	},
};

export default apiMovies;
