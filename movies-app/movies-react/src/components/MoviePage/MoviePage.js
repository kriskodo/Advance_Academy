import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import './MoviePage.css';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  DialogTitle,
  Drawer,
  FormControl,
  Rating,
  TextareaAutosize,
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';
import apiMovies from '@Api/movies';
import MovieComments from '@Components/MovieComments/MovieComments';

function MoviePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isEditing, setIsEditing] = useState(false);
  const [editableValues, setEditableValues] = useState({});
  const [originalValues, setOriginalValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [isRatingDisabled, setIsRatingDisabled] = useState(false);
  const [commentsDrawerOpened, setCommentsDrawerOpened] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const {
      title, description, posterUrl, youtubeId,
    } = editableValues;
    setIsLoading(true);

    apiMovies.editMovie(id, typeof title === 'object' ? title[0] : title, description, posterUrl, youtubeId)
      .then(() => {
        setIsEditing(false);
        setOriginalValues(() => ({ ...editableValues }))
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

  const onCommentSubmit = (value) => {
    apiMovies.commentMovie(id, 'Static Username', value)
      .then((newComment) => {
        setEditableValues((prevValues) => {
          const copy = { ...prevValues };
          copy.comments = [...copy.comments, newComment];
          return copy;
        })
      })
      .catch((err) => console.log(err));
  }

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
  });

  const {
    title,
    description,
    posterUrl,
    rating: movieRating,
    comments,
    youtubeId,
  } = editableValues;

  const onMovieDelete = (movieId) => {
    apiMovies.deleteMovie(movieId)
      .finally((res) => {
        console.log(res);
        navigate('/movies');
      })
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Card variant="outlined" ima>
        <CardContent>
          {isLoading && (
            <div>Loading...</div>
          )}
          {editableValues && !isLoading && !isEditing && (
          <>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CardMedia
                component="img"
                image={posterUrl ?? ''}
                style={{
                  maxHeight: '200px',
                  maxWidth: '200px',
                  objectFit: 'contain',
                }}
                alt="card-image"
              />
            </Box>

            <br />

            <h2
              onMouseEnter={() => setShowDelete(true)}
              onMouseLeave={() => setShowDelete(false)}
            >
              {title}
              {showDelete && (
              <span style={{ position: 'absolute' }}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete
                </Button>
              </span>
              )}
            </h2>

            <Dialog
              open={showDeleteModal}
              onClose={() => setShowDeleteModal(false)}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box flex alignItems="center" justifyContent="center">
                <DialogTitle>
                  Are you sure you want to delete
                  {' '}
                  {title}
                  ?
                </DialogTitle>

                <ButtonGroup
                  disableElevation
                  variant="contained"
                  aria-label="Disabled elevation buttons"
                  fullWidth
                >
                  <Button onClick={() => onMovieDelete(id)}>Delete</Button>
                  <Button color="error" onClick={() => setShowDeleteModal(false)}>Back</Button>
                </ButtonGroup>
              </Box>
            </Dialog>
            <hr />

            <h5>Description</h5>
            <p>{description}</p>
            <hr />

            <h5>Rating</h5>

            <StyledRating
              name="customized-color"
              defaultValue={movieRating}
              value={rating}
              onChange={onRatingChange}
              disabled={isRatingDisabled}
              precision={1}
              icon={<FavoriteIcon fontSize="inherit" />}
              emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            />
            <hr />
            <React.Fragment key="left-drawer">
              <Button onClick={() => setCommentsDrawerOpened(true)}>See Comments</Button>
              <Drawer
                anchor="right"
                open={commentsDrawerOpened}
                onClose={() => setCommentsDrawerOpened(false)}
              >
                <Box
                  sx={{ width: 750 }}
                  role="presentation"
                >
                  <MovieComments
                    comments={comments}
                    onCommentSubmit={(value) => onCommentSubmit(value)}
                  />
                </Box>
              </Drawer>
            </React.Fragment>
            <hr />

            <ButtonGroup
              disableElevation
              variant="contained"
              aria-label="Disabled elevation buttons"
            >
              <Button onClick={() => setIsEditing(true)}>Edit</Button>
              <Button onClick={() => navigate('/movies')}>Back</Button>
            </ButtonGroup>

            <hr />
            <Card style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CardHeader>
                <h5>
                  Trailer:
                </h5>
              </CardHeader>
              <CardContent>
                <iframe
                  title={title}
                  width="420"
                  height="315"
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                />
              </CardContent>
            </Card>
          </>
          )}
          {editableValues && !isLoading && isEditing && (
            <Box flex alignItems="center" justifyContent="center">
              <Typography sx={{ fontSize: 32 }} color="text.secondary" gutterBottom>
                Edit
                {' '}
                {originalValues.title}
              </Typography>
              <form onSubmit={handleEditSubmit} style={{ width: '500px', margin: 'auto' }}>
                {Object.keys(editableValues).filter((x) => x !== 'id' && x !== 'rating' && x !== 'comments').map((key) => (
                  <div key={key}>
                    {key === 'description' && (
                    <FormControl fullWidth margin="dense">
                      <TextareaAutosize
                        id={`${id}`}
                        rows={10}
                        cols={50}
                        type="text"
                        label={key}
                        value={editableValues[key]}
                        onChange={handleChange}
                        name={key}
                      />
                    </FormControl>
                    )}

                    {key !== 'description' && (
                    <FormControl fullWidth margin="dense">
                      <TextField
                        label={key}
                        variant="outlined"
                        id={`${editableValues.id}`}
                        type="text"
                        value={editableValues[key]}
                        onChange={handleChange}
                        name={key}
                      />
                    </FormControl>
                    )}
                  </div>
                ))}
                <ButtonGroup
                  disableElevation
                  variant="contained"
                  aria-label="Disabled elevation buttons"
                >
                  <Button type="submit">Save</Button>
                  <Button type="button" onClick={handleDiscard}>Discard</Button>
                </ButtonGroup>
              </form>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default MoviePage;
