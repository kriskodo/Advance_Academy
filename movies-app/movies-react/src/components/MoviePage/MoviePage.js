import React, { useState } from 'react';
import {
  MDBBtn, MDBBtnGroup, MDBInput, MDBTextArea,
} from 'mdb-react-ui-kit';
import { useLocation, useNavigate } from 'react-router';

function MoviePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    id, description, comments, posterUrl, rating, title, youtubeId,
  } = location.state;

  const [isEditing, setIsEditing] = useState(false);
  const [editedValues, setEditedValues] = useState({
    id,
    description,
    title,
    rating,
    youtubeId,
    comments,
    posterUrl,
  });

  const handleChange = (e) => {
    setEditedValues((prev) => (
      {
        ...prev,
        [e.target.name]: [e.target.value],
      }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(editedValues);
  };

  return (
    <div className="movie">
      {isEditing ? (
        <>
          <div>
            Edit
            {title}
          </div>
          <form onSubmit={handleSubmit}>
            {Object.keys(editedValues).filter((x) => x !== 'id').map((key) => (
              <div key={key}>
                <label
                  htmlFor={`${id}_${description}`}
                  className="form-label"
                >
                  {key}
                </label>

                {key === 'description' && (
                <MDBTextArea
                  id={`${id}_${description}`}
                  rows={10}
                  cols={50}
                  type="text"
                  value={editedValues[key]}
                  onChange={handleChange}
                  name={key}
                />
                )}

                {key !== 'description' && (
                <MDBInput
                  id={`${id}_${description}`}
                  rows={10}
                  cols={50}
                  type="text"
                  value={editedValues[key]}
                  onChange={handleChange}
                  name={key}
                />
                )}
              </div>
            ))}
            <MDBBtnGroup>
              <MDBBtn type="submit">Save</MDBBtn>
              <MDBBtn
                type="button"
                onClick={() => setIsEditing(false)}
              >
                Discard
              </MDBBtn>
            </MDBBtnGroup>
          </form>
        </>
      ) : (
        <>
          <img
            src={posterUrl}
            style={{ maxWidth: '500px', maxHeight: '500px' }}
            alt="poster"
          />
          <h2>{title}</h2>

          <p>{description}</p>

          <p>{rating}</p>

          <MDBBtnGroup>
            <MDBBtn onClick={() => setIsEditing(true)}>Edit</MDBBtn>
            <MDBBtn onClick={() => navigate('/movies')}>Back</MDBBtn>
          </MDBBtnGroup>
        </>
      )}

    </div>
  );
}

{ /* <iframe width="420" height="315" */
}
{ /*        src={`https://www.youtube.com/embed/${youtubeId}`}> */
}
{ /* </iframe> */
}

export default MoviePage;
