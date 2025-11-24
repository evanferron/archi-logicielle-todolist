import { useState } from "react";
import type { Task } from "../models/task";
import { editTask } from "../services/task";

type Props = {
  task: Readonly<Task>;
  onChange?: (task: Task) => void;
};

export const TaskDetails = ({ task, onChange }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(task.name);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editStatus, setEditStatus] = useState(task.status);
  const handleSave = async () => {
    await editTask(task.id, {
      name: editName,
      description: editDescription,
      status: editStatus,
      date: task.date,
    });
    if (onChange) {
      onChange({
        ...task,
        name: editName,
        description: editDescription,
        status: editStatus,
      });
    }
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
            onChange={(e) =>
              setEditStatus(e.target.value as "pending" | "completed")
            }
          >
            <option value="à faire">À faire</option>
            <option value="en cours">En cours</option>
            <option value="terminée">Terminée</option>
          </select>
          <p>
            <strong>Date de création:</strong> {task.date.getDay()}/
            {task.date.getMonth()}/{task.date.getFullYear()}:
            {task.date.getHours()}:{task.date.getMinutes()}
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
            <strong>Date de création:</strong> {task.date.getDay()}/
            {task.date.getMonth()}/{task.date.getFullYear()}:
            {task.date.getHours()}:{task.date.getMinutes()}
          </p>
          <button onClick={() => setIsEditing(true)}>Modifier</button>
        </>
      )}
    </div>
  );
};
