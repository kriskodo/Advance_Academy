import React, { useId, useRef, useState } from 'react';

export default function CreateTodo({ onAddTodo }) {
  const [value, setValue] = useState('');
  const todoId = useId();
  const todoRef = useRef(null);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <label htmlFor={todoId}>
        Create Todo:
        <input id={todoId} ref={todoRef} onChange={onChange} value={value} />
      </label>

      <button type="button" onClick={() => onAddTodo(todoRef.current.value)}>Add Todo</button>
    </div>
  );
}
