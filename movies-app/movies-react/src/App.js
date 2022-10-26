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
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MoviePage />} />
      </Routes>
    </div>
  );
}

export default App;
