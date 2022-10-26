import React from 'react';
import './Movie.css';
import { MDBBtn, MDBBtnGroup } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router';

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
        style={{ maxWidth: '500px', maxHeight: '500px' }}
        alt="poster"
      />
      <h2>{title}</h2>

      <p>{description}</p>

      <p>{rating}</p>

      <MDBBtnGroup>
        <MDBBtn onClick={() => navigate(`./${id}`)}>
          Edit
        </MDBBtn>
      </MDBBtnGroup>
    </div>
  );
}

export default Movie;
