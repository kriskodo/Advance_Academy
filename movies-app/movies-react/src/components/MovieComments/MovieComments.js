import React, { useState } from 'react';
import { Divider, FormControl, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function MovieComments({ comments, onCommentSubmit }) {
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  }

  const renderComments = !comments.length ? (
    <div>
      No comments yet. You can be the first one to comment!
    </div>
  ) : (
    <Box maxHeight="82vh" style={{ overflowY: 'scroll' }}>
      {comments.map(({
        author, content, id, date,
      }) => (
        <div key={id}>
          <h6>{author}</h6>
          <p>{content}</p>
          <small>{date}</small>
          <Divider />
        </div>
      ))}
    </Box>
  )
  return (
    <Box sx={{
      display: 'flex',
      height: '100vh',
      width: '100%',
      flexDirection: 'column',
    }}
    >
      <h2>Comments</h2>

      {renderComments}

      <div style={{ position: 'absolute', bottom: '0', width: '100%' }}>
        <FormControl fullWidth>
          <TextField
            id="filled-multiline-flexible"
            label="Comment"
            multiline
            maxRows={10}
            value={value}
            onChange={onChange}
            variant="filled"
          />
        </FormControl>

        <Divider />
        <Button color="primary" onClick={() => onCommentSubmit(value)}>Comment</Button>
      </div>
    </Box>
  );
}

export default MovieComments;
