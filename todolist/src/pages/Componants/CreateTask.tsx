import React, { useState } from "react";
import type { Task } from "../../models/task";

const CreateTask: React.FC<{ onCreate: (task: Task) => void }> = ({ onCreate }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: new Date().toString(),
      name,
      description,
     status: "pending",
      date: new Date(),
    };
    onCreate(newTask);
    setName("");
    setDescription("");
    setStatus("pending");
  };

  return (
    <form onSubmit={handleSubmit} className="create-task-form">
      <h2>Créer une tâche</h2>
      <div>
        <label>Titre :</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description :</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">Créer</button>
    </form>
  );
};

export default CreateTask;