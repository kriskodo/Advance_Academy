import React, { memo, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Movie from '../Movie/Movie';
import apiMovies from '../../api/movies';

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      const response = await apiMovies.getAll();
      if (isLoading) {
        setMovies(response);
      }
    }

    setIsLoading(false);

    fetchData();
  }, [isLoading]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  return (
    <>
      <TextField id="standard-basic" value={search} onChange={handleSearch} label="Search for a movie" variant="standard" />

      <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
        {isLoading
          ? <div>Loading</div>
          : movies.filter((x) => x.title
            .toLowerCase()
            .includes(search))
            .map((movie) => (
              <div key={movie.id}>
                <Movie {...movie} />
              </div>
            ))}
      </div>

    </>
  );
}

// Should I?
export default memo(MoviesPage);
