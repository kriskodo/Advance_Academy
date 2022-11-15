import { createAsyncThunk } from '@reduxjs/toolkit';
import { moviesActionTypes } from '@Src/store/movies/moviesActionTypes';
import apiMovies from '@Api/movies';

export const fetchMovies = createAsyncThunk(moviesActionTypes.fetchMovies, async () => {
  const movies = await apiMovies.getAll();
  return movies;
})
