import React from 'react';
import './Movie.css';
import { useNavigate } from 'react-router';
import { Button, ButtonGroup } from '@mui/material';

function Movie({
  id,
  title,
  description,
  rating,
  posterUrl,
}) {
  const navigate = useNavigate();

  return (
    <div className="movie">
      <img
        src={posterUrl}
        style={{ width: '250px', height: '250px', objectFit: 'contain' }}
        alt="poster"
      />
      <h4>
        {title.substring(0, 25)}
        {title.length > 25 ? '...' : ''}
      </h4>

      <p>
        {description.substring(0, 50)}
        {description.length > 50 ? '...' : ''}
      </p>

      <p>
        Rating:
        {+rating.toFixed(2)}
        /5
      </p>

      <ButtonGroup
        disableElevation
        variant="contained"
        aria-label="Disabled elevation buttons"
      >
        <Button onClick={() => navigate(`./${id}`)}>View</Button>
      </ButtonGroup>
    </div>
  );
}

export default Movie;
