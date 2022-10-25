import React, { useState } from 'react';
import '../Todo.css';

export default function Todo({
  id, value, onEdit, onDelete, onComplete,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const renderEditing = () => (
    <div className="todo" onDoubleClick={() => setIsEditing(false)}>
      <textarea value={value} onChange={(e) => onEdit(e, id)} />
      <input type="button" className="button--danger" value="Delete" onClick={() => onDelete(id)} />
      <input type="button" className="button--success" value="Complete" onClick={() => onComplete(id)} />
    </div>
  );

  const renderNotEditing = () => (
    <div className="todo" onDoubleClick={() => setIsEditing(true)}>
      <p>{value}</p>
    </div>
  );

  const render = isEditing ? renderEditing : renderNotEditing;

  return render();
}
