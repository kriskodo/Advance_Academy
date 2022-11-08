import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import React from 'react';

function MuiForm({
  initialValues,
  validationSchema,
  onSubmit,
  actionButtons,
  style,
}) {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  return (
    <div style={style}>
      <form onSubmit={formik.handleSubmit}>
        {Object.keys(initialValues).map((name) => (
          <TextField
            id={name}
            key={name}
            name={name}
            label={name}
            value={formik.values[name]}
            onChange={formik.handleChange}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
            fullWidth
            margin="dense"
          />
        ))}
        {actionButtons}
      </form>
    </div>
  )
}

export default MuiForm;
