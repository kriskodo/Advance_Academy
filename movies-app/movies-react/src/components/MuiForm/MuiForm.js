import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React from 'react';

function MuiForm({ initialValues, validationSchema, onSubmit }) {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        {Object.keys(initialValues).map((name) => (
          <TextField
            fullWidth
            id={name}
            key={name}
            name={name}
            label={name}
            value={formik.values[name]}
            onChange={formik.handleChange}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
          />
        ))}
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default MuiForm;
