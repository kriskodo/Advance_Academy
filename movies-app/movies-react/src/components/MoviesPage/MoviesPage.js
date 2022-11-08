import React, { memo, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Movie from '@Components/Movie/Movie';
import apiMovies from '@Api/movies';
import ProgressLoading from '@Components/ProgressLoading/ProgressLoading';

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

  const moviesByRating = movies
    .filter((x) => x.title
      .toLowerCase()
      .includes(search))
    .sort((a, b) => b.rating - a.rating);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <Container maxWidth="md">
      <TextField id="standard-basic" value={search} onChange={handleSearch} label="Search for a movie" variant="standard" />

      <Grid container spacing={2} margin="0 auto">
        {isLoading
          ? (
            <ProgressLoading />
          )
          : moviesByRating.map((movie) => (
            <Grid key={movie.id}>
              <Item>
                <Movie {...movie} />
              </Item>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

// Should I?
export default memo(MoviesPage);
