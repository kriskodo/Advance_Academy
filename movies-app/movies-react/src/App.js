import './App.css';
import { Route, Routes } from 'react-router';
import Movies from './components/MoviesPage/MoviesPage';
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import MoviePage from './components/MoviePage/MoviePage';

function App() {
  return (
    <div className="App">
      <Navigation />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path="/movies/:id" element={<MoviePage />} />
        <Route path="*" element={<p>Error 404 Not found.</p>} />
      </Routes>
    </div>
  );
}

export default App;
