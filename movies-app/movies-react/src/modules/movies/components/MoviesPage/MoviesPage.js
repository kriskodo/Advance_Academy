import React, { memo, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Movie from '@Src/modules/movies/components/Movie/Movie';
import ProgressLoading from '@Modules/common/components/ProgressLoading/ProgressLoading';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllMovies, selectMoviesLoading } from '@Src/store/movies/moviesSlice';
import { fetchMovies } from '@Src/store/movies/moviesActions';

function MoviesPage() {
  const movies = useSelector(selectAllMovies);
  const isLoading = useSelector(selectMoviesLoading);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  console.log(movies);

  const moviesByRating = movies
    ?.filter((x) => x.title
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
          : moviesByRating?.map((movie) => (
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
