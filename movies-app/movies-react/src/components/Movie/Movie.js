import React from 'react';
import './Movie.css';
import { MDBBtn, MDBBtnGroup } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router';

function Movie(props) {
  const navigate = useNavigate();

  return (
    <div className="movie">
      <img src={props.posterUrl} style={{ maxWidth: '500px', maxHeight: '500px' }} alt="poster" />
      <h2>{props.title}</h2>

      <p>{props.description}</p>

      <p>{props.rating}</p>

      <MDBBtnGroup>
        <MDBBtn onClick={() => navigate(`/movies/${props.id}`, {
          state: {
            ...props,
          },
        })}
        >
          Edit
        </MDBBtn>
      </MDBBtnGroup>

      {/* <iframe width="420" height="315" */}
      {/*        src={`https://www.youtube.com/embed/${youtubeId}`}> */}
      {/* </iframe> */}
    </div>
  );
}

export default Movie;
