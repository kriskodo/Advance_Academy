import '@Src/App.css';
import { Route, Routes } from 'react-router';
import Movies from '@Components/MoviesPage/MoviesPage';
import Navigation from '@Components/Navigation/Navigation';
import Home from '@Components/Home/Home';
import MoviePage from '@Components/MoviePage/MoviePage';
import MovieCreate from '@Components/MovieCreate/MovieCreate';

function App() {
  return (
    <div className="App">
      <Navigation />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path="/movies/:id" element={<MoviePage />} />
        <Route exact path="/movies/create" element={<MovieCreate />} />
        <Route path="*" element={<p>Error 404 Not found.</p>} />
      </Routes>
    </div>
  );
}

export default App;
