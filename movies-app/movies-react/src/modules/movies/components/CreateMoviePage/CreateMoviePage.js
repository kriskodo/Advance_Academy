import React from 'react';
import * as yup from 'yup';
import MuiForm from '@Modules/common/components/MuiForm/MuiForm';
import apiMovies from '@Api/movies';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import { Card, CardContent } from '@mui/material';
import Button from '@mui/material/Button';

function CreateMoviePage() {
  const navigate = useNavigate();

  const formConfig = {
    initialValues: {
      Title: '',
      Description: '',
      'Poster Url': '',
      'Youtube Url': '',
    },
    validationSchema: yup.object({
      Title: yup
        .string('Enter a title')
        .required('Title is required'),
      Description: yup
        .string('Enter a description')
        .min(10, 'Description should be of minimum 10 characters length')
        .required('Description is required'),
      'Poster Url': yup
        .string('Enter a Poster Url')
        .url('Enter a valid url')
        .required('Poster Url is required'),
      'Youtube Url': yup
        .string('Enter a Youtube Url')
        .url('Enter a valid url')
        .required('Youtube Url is required'),
    }),
    onSubmit: (values) => {
      apiMovies.createMovie(values.Title, values.Description, values['Poster Url'], values['Youtube Url'])
        .then(() => {
          navigate('/movies');
        })
        .catch((err) => console.log(err));
    },
    actionButtons: (
      <Button type="submit" variant="outlined">Submit</Button>
    ),
  }
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Card>
        <h2>Create a new movie</h2>

        <CardContent>
          <MuiForm {...formConfig} />
        </CardContent>
      </Card>
    </Box>
  );
}

export default CreateMoviePage;
