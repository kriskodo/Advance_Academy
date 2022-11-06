import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import Button from '@mui/material/Button';
import { LinearProgress } from '@mui/material';

function MovieCreate() {
  return (
    <div>
      <h2>Create a movie</h2>

      <Formik
        initialValues={{
          title: '',
          description: '',
          posterUrl: '',
        }}
        validate={(values) => {
          const errors = {};
          Object.keys(values).forEach((value) => {
            if (!values[value]) {
              errors[value] = `Field ${value} cannot be empty.`
            }
          })
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          console.log(values);
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({
          submitForm, isSubmitting,
        }) => (
          <Form>
            <Field
              component={TextField}
              name="title"
              type="text"
              label="Title"
            />
            <br />
            <Field
              component={TextField}
              name="description"
              type="text"
              label="Description"
            />
            {isSubmitting && <LinearProgress />}
            <br />
            <Button
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              onClick={submitForm}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default MovieCreate;
