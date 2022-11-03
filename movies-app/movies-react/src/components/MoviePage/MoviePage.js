import React, { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBBtnGroup,
  MDBCard, MDBCardBody,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBInput,
  MDBRow,
  MDBTextArea,
} from 'mdb-react-ui-kit';

import { useNavigate, useParams } from 'react-router';
import './MoviePage.css';
import {
  Box,
  Button,
  Divider,
  Drawer,
  Rating,
} from '@mui/material';
import apiMovies from '../../api/movies';

function MoviePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isEditing, setIsEditing] = useState(false);
  const [editableValues, setEditableValues] = useState(null);
  const [originalValues, setOriginalValues] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [isRatingDisabled, setIsRatingDisabled] = useState(false);
  const [commentsDrawerOpened, setCommentsDrawerOpened] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    apiMovies.getById(id)
      .then((data) => {
        setEditableValues({ ...data });
        setOriginalValues({ ...data });
        setRating(data.rating)
      })
      .catch((err) => {
        console.log(err);
        navigate('/404');
      })
      .finally(() => {
        setIsLoading(false);
      })

    return () => {
      setIsLoading(false);
    };
  }, [id, navigate]);

  const handleChange = (e) => {
    setEditableValues((prev) => (
      {
        ...prev,
        [e.target.name]: [e.target.value],
      }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      title, description, posterUrl, youtubeId,
    } = editableValues;
    setIsLoading(true);

    apiMovies.editMovie(id, typeof title === 'object' ? title[0] : title, description, posterUrl, youtubeId)
      .then(() => {
        setIsEditing(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDiscard = (e) => {
    e.preventDefault();
    setEditableValues(originalValues);
    setIsEditing(false);
  }

  const onRatingChange = (e, chosenRating) => {
    apiMovies.rateMovie(id, chosenRating).then((ratingAfterUpdate) => {
      setIsRatingDisabled(true);
      setRating(ratingAfterUpdate);
    });
  }

  const toggleDrawer = (flag) => {
    setCommentsDrawerOpened(flag);
  }

  return (
    <MDBRow className="d-flex justify-content-center">
      {editableValues && !isLoading ? (
        <MDBCol sm="6" className="p-5">
          <MDBCard sm="6" className="p-5">
            {isEditing ? (
              <>
                <MDBCardHeader>
                  Edit
                  {' '}
                  {originalValues.title}
                </MDBCardHeader>
                <form onSubmit={handleSubmit}>
                  {Object.keys(editableValues).filter((x) => x !== 'id' && x !== 'rating').map((key) => (
                    <div key={key}>
                      <label
                        htmlFor={`${editableValues.id}_${editableValues.description}`}
                        className="form-label"
                      >
                        {key}
                      </label>

                      {key === 'description' && (
                      <MDBTextArea
                        id={`${editableValues.id}_${editableValues.description}`}
                        rows={10}
                        cols={50}
                        type="text"
                        value={editableValues[key]}
                        onChange={handleChange}
                        name={key}
                      />
                      )}

                      {key !== 'description' && (
                      <MDBInput
                        id={`${editableValues.id}_${editableValues.description}`}
                        rows={10}
                        cols={50}
                        type="text"
                        value={editableValues[key]}
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
                      onClick={handleDiscard}
                    >
                      Discard
                    </MDBBtn>
                  </MDBBtnGroup>
                </form>
              </>
            ) : (
              <>
                <MDBCardImage
                  src={editableValues?.posterUrl}
                  className="card-img-top card-img-top--fit"
                  alt="poster"
                />
                <br />

                <h5>{editableValues.title}</h5>
                <hr />

                <h5>Description</h5>
                <p>{editableValues.description}</p>
                <hr />

                <h5>Rating</h5>
                <Rating
                  name="half-rating"
                  value={rating}
                  onChange={onRatingChange}
                  disabled={isRatingDisabled}
                />
                <hr />

                <MDBBtnGroup>
                  <MDBBtn onClick={() => setIsEditing(true)}>Edit</MDBBtn>
                  <MDBBtn onClick={() => navigate('/movies')}>Back</MDBBtn>
                </MDBBtnGroup>
                <hr />
                <MDBCard style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <MDBCardHeader>
                    <h5>
                      Trailer:
                    </h5>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <iframe
                      title={editableValues.title}
                      width="420"
                      height="315"
                      src={`https://www.youtube.com/embed/${editableValues.youtubeId}`}
                    />
                  </MDBCardBody>
                </MDBCard>

                <React.Fragment key="left-drawer">
                  <Button onClick={() => toggleDrawer(true)}>See Comments</Button>
                  <Drawer
                    anchor="right"
                    open={commentsDrawerOpened}
                    onClose={() => toggleDrawer(false)}
                  >
                    <Box
                      sx={{ width: 750 }}
                      role="presentation"
                    >
                      comments
                      <Divider />
                      comment now
                    </Box>
                  </Drawer>
                </React.Fragment>
              </>
            )}
          </MDBCard>
        </MDBCol>
      ) : (
        <div>Loading...</div>
      )}
    </MDBRow>
  );
}

export default MoviePage;
