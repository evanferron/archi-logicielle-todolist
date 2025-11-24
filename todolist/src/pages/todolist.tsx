import React, { useEffect, useState } from "react";
import { getTasks } from "../services/task";
import TaskDetails from "./Componants/TaskDetails";
import CreateTask from "./Componants/CreateTask";
import type { Task } from "../models/task";
import type { TodoList } from "../models/todolist";

const Todolist: React.FC = () => {
  const [todolist, setTodolist] = useState<TodoList>({ tasks: [] });
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateTask = (task: Task) => {
    setTodolist({ tasks: [...todolist.tasks, task] });
  };

  const fetchTasks = async () => {
    getTasks().then((data) => setTodolist(data));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Ma Todo List</h1>
      <div>
        <button onClick={() => setShowCreateModal(true)}>Créer une tâche</button>
      </div>

      {showCreateModal && (
        <dialog open style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          border: "none",
        }}>
          <div style={{ background: "#fff", padding: 20, borderRadius: 6, minWidth: 320 }}>
            <CreateTask
              onCreate={(task) => {
                handleCreateTask(task);
              }}
              onClose={() => setShowCreateModal(false)}
            />
          </div>
        </dialog>
      )}

      <div style={{ marginTop: "2rem" }}>
        {todolist.tasks.length === 0 ? (
          <p>Aucune tâche pour le moment.</p>
        ) : (
          todolist.tasks.map((task) => <TaskDetails key={task.id} {...task} />)
        )}
      </div>
    </div>
  );
};

export default Todolist;
