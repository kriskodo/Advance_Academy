import './App.css';
import Movies from "./components/Movies/Movies";
import Navigation from "./components/Navigation/Navigation";
import {Route, Routes} from "react-router";
import Home from "./components/Home/Home";
import MoviePage from "./components/MoviePage/MoviePage";

function App() {
	return (
		<div className='App'>
			<Navigation />

			<Routes>
				<Route path="/home" element={<Home />} />
				<Route path="/movies" element={<Movies /> } />
				<Route path={`/movies/:id`} element={<MoviePage />} />
			</Routes>
		</div>
	);
}

export default App;
