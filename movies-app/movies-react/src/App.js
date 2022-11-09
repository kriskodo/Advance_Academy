import '@Src/App.css';
import { Route, Routes } from 'react-router';
import Home from '@Src/modules/home/components/Home';
import MoviesPage from '@Modules/movies/components/MoviesPage/MoviesPage';
import Navigation from '@Modules/common/components/Navigation/Navigation';
import MoviePage from '@Modules/movies/components/MoviePage/MoviePage';
import CreateMoviePage from '@Modules/movies/components/CreateMoviePage/CreateMoviePage';
import NotFound from '@Modules/common/components/NotFound';

function App() {
  return (
    <div className="App">
      <Navigation />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/movies" element={<MoviesPage />} />
        <Route exact path="/movies/:id" element={<MoviePage />} />
        <Route exact path="/movies/create" element={<CreateMoviePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
