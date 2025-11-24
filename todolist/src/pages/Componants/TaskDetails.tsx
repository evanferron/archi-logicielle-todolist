import { useState } from "react";
import type { Task } from "../../models/task";

const TaskDetails = ({ name, description, status, date }: Task) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editDescription, setEditDescription] = useState(description);
  const [editStatus, setEditStatus] = useState(status);

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="task-card">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
          <select
            value={editStatus}
            onChange={(e) => setEditStatus(e.target.value as typeof status)}
          >
            <option value="à faire">À faire</option>
            <option value="en cours">En cours</option>
            <option value="terminée">Terminée</option>
          </select>
          <p>
            <strong>Date de création:</strong> {date.toISOString()}
          </p>
          <button onClick={handleSave}>Enregistrer</button>
        </>
      ) : (
        <>
          <h2>{editName}</h2>
          <p>
            <strong>Description:</strong> {editDescription}
          </p>
          <p>
            <strong>Status:</strong> {editStatus}
          </p>
          <p>
            <strong>Date de création:</strong> {date.toISOString()}
          </p>
          <button onClick={() => setIsEditing(true)}>Modifier</button>
        </>
      )}
    </div>
  );
};

export default TaskDetails;
