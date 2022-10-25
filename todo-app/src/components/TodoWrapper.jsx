import React, { useState } from 'react';
import CreateTodo from './CreateTodo';
import Todo from './Todo';

export default function TodoWrapper() {
  const [todos, setTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  const mapToObjectData = (value) => ({
    key: Date.now(),
    id: Date.now(),
    value,
    isCompleted: false,
  });

  const onAddTodo = (value) => {
    setTodos((prevTodos) => [...prevTodos, mapToObjectData(value)]);
  };

  const onDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const onEdit = (e, id) => {
    setTodos((prevTodos) => {
      const copy = [...prevTodos];
      const editingTodo = copy.find((x) => x.id === id);
      editingTodo.value = e.target.value;
      return copy;
    });
  };

  const onComplete = (id) => {
    setTodos((prevTodos) => {
      const copy = [...prevTodos];
      const editingTodo = copy.find((x) => x.id === id);
      editingTodo.isCompleted = true;
      return copy;
    });
  };

  return (
    <div className="todo-wrapper">
      <div className="todo-wrapper__head">
        <CreateTodo onAddTodo={onAddTodo} />
        <input
          type="button"
          value={showCompleted ? 'Show todos' : 'Show completed todos'}
          onClick={() => setShowCompleted(!showCompleted)}
        />
      </div>

      <div className="todo-wrapper__body">
        {(
          todos.filter((x) => x.isCompleted === showCompleted)
            .map((todoData) => (
              <Todo
                {...todoData}
                onEdit={onEdit}
                onDelete={onDelete}
                onComplete={onComplete}
              />
            ))
        )}
      </div>
    </div>
  );
}
