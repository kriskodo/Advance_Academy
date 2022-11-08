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
  DialogTitle, Divider,
  Drawer,
  Rating,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';
import apiMovies from '@Api/movies';
import MovieComments from '@Components/MovieComments/MovieComments';
import Container from '@mui/material/Container';
import MuiForm from '@Components/Forms/MuiForm/MuiForm';
import ProgressLoading from '@Components/ProgressLoading/ProgressLoading';

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

  useEffect(() => {
    setEditableValues({ ...originalValues });
  }, [originalValues])

  const handleEditSubmit = (data) => {
    const {
      title, description, posterUrl, youtubeId,
    } = data;
    setIsLoading(true);

    apiMovies.editMovie(id, typeof title === 'object' ? title[0] : title, description, posterUrl, youtubeId)
      .then(() => {
        setIsEditing(false);
        setOriginalValues(() => ({ ...data }))
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
        setOriginalValues((prevValues) => {
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
      .finally(() => {
        navigate('/movies');
      })
  }

  const isDataLoaded = editableValues && !isLoading;

  return (
    <Container maxWidth="md">
      <Card variant="outlined">
        <CardContent>
          {isLoading && (
            <ProgressLoading />
          )}
          {isDataLoaded && !isEditing && (
          <>
            <CardMedia
              component="img"
              image={posterUrl ?? ''}
              style={{
                maxHeight: '350px',
                objectFit: 'scale-down',
              }}
              alt="card-image"
            />
            <CardContent>
              <Divider>Title</Divider>
              <h2
                onMouseEnter={() => setShowDelete(true)}
                onMouseLeave={() => setShowDelete(false)}
                style={{ margin: '20px' }}
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

              <Divider>Description</Divider>
              <p style={{ margin: '10px' }}>{description}</p>

              <Divider>Rating</Divider>
              <StyledRating
                style={{ margin: '10px' }}
                name="customized-color"
                defaultValue={movieRating}
                value={rating}
                onChange={onRatingChange}
                disabled={isRatingDisabled}
                precision={1}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
              />

              <Divider>Comments</Divider>
              <React.Fragment key="left-drawer">
                <Button onClick={() => setCommentsDrawerOpened(true)}>See Comments</Button>
                <Drawer
                  anchor="right"
                  open={commentsDrawerOpened}
                  onClose={() => setCommentsDrawerOpened(false)}
                >
                  <Box
                    sx={{ width: 750 }}
                    margin={{ margin: '10px' }}
                    role="presentation"
                  >
                    <MovieComments
                      comments={comments}
                      onCommentSubmit={(value) => onCommentSubmit(value)}
                    />
                  </Box>
                </Drawer>
              </React.Fragment>

              <Divider />
              <ButtonGroup
                disableElevation
                variant="contained"
                aria-label="Disabled elevation buttons"
              >
                <Button onClick={() => setIsEditing(true)}>Edit</Button>
                <Button onClick={() => navigate('/movies')}>Back</Button>
              </ButtonGroup>

              <Divider>Trailer</Divider>
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
            </CardContent>
          </>
          )}
          {isDataLoaded && isEditing && (
            <Box flex alignItems="center" justifyContent="center">
              <Typography sx={{ fontSize: 32 }} color="text.secondary" gutterBottom>
                Edit
                {' '}
                {originalValues.title}
              </Typography>
              <MuiForm
                initialValues={Object.keys(editableValues)
                  .filter((x) => x !== 'id' && x !== 'rating' && x !== 'comments')
                  .reduce((acc, val) => {
                    acc[val] = editableValues[val];
                    return acc;
                  }, {})}
                onSubmit={handleEditSubmit}
                actionButtons={(
                  <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled elevation buttons"
                  >
                    <Button type="submit">Save</Button>
                    <Button type="button" onClick={handleDiscard}>Discard</Button>
                  </ButtonGroup>
                )}
                style={{ width: '500px', margin: 'auto' }}
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default MoviePage;
