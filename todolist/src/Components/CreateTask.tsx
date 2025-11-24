import React, { useState } from "react";
import type { Task } from "../models/task";

export const CreateTask: React.FC<{
  onCreate: (task: Task) => void;
  onClose?: () => void;
}> = ({ onCreate, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"pending">("pending");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: Date.now().toString(),
      name,
      description,
      status,
      date: new Date(),
    };
    onCreate(newTask);
    setName("");
    setDescription("");
    setStatus("pending");
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="create-task-form">
      <h2>Créer une tâche</h2>
      <div>
        <label htmlFor="create-name">Titre :</label>
        <input
          id="create-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="create-desc">Description :</label>
        <textarea
          id="create-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="create-status">Status :</label>
        <select
          id="create-status"
          value={status}
          onChange={(e) => setStatus(e.target.value as "pending")}
        >
          <option value="pending">À faire</option>
          <option value="completed">Terminée</option>
        </select>
      </div>
      <div style={{ marginTop: 8 }}>
        <button type="submit">Créer</button>
        {onClose && (
          <button type="button" onClick={onClose} style={{ marginLeft: 8 }}>
            Annuler
          </button>
        )}
      </div>
    </form>
  );
};
