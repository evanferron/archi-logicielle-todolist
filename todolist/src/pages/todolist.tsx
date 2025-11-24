import React, { useEffect, useState } from "react";
import { getTasks } from "../services/task";
import TaskDetails from "./Componants/TaskDetails";
import CreateTask from "./Componants/CreateTask";
import type { Task } from "../models/task";
import type { TodoList } from "../models/todolist";

const Todolist: React.FC = () => {
  const [todolist, setTodolist] = useState<TodoList>({ tasks: [] });

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
      <CreateTask onCreate={handleCreateTask} />
      <div style={{ marginTop: "2rem" }}>
        {todolist.tasks.length === 0 ? (
          <p>Aucune tâche pour le moment.</p>
        ) : (
          todolist.tasks.map((task, idx) => <TaskDetails key={idx} {...task} />)
        )}
      </div>
    </div>
  );
};

export default Todolist;
