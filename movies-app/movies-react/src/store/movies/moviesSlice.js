import { createSlice } from '@reduxjs/toolkit';
import { fetchMovies } from '@Src/store/movies/moviesActions';

const initialState = {
  movies: [],
  loading: false,
}

const moviesSlice = createSlice({
  name: '[MOVIES]',
  initialState,
  reducers: {},
  extraReducers: (({ addCase }) => {
    addCase(fetchMovies.pending, (state) => {
      state.loading = true;
    })
    addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
      state.loading = false;
    })
  }),
})

export const selectAllMovies = (state) => state.moviesReducer.movies;

export const selectMoviesLoading = (state) => state.moviesReducer.loading;

export default moviesSlice.reducer;
