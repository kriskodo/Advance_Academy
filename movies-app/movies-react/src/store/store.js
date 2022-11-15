import { configureStore } from '@reduxjs/toolkit'
import MoviesSlice from '@Src/store/movies/moviesSlice';

const store = configureStore({
  reducer: {
    moviesReducer: MoviesSlice,
  },
})

export default store;
