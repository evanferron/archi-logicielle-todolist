import React, { useState } from "react";
import TaskDetails from "./Componants/Task";
import CreateTask from "./Componants/CreateTask";
import type { Task } from "../models/task";

const Todolist: React.FC = () => {
	const [tasks, setTasks] = useState<Task[]>([]);

	const handleCreateTask = (task: Task) => {
		setTasks([...tasks, task]);
	};

	return (
		<div>
			<h1>Ma Todo List</h1>
			<CreateTask onCreate={handleCreateTask} />
			<div style={{ marginTop: "2rem" }}>
				{tasks.length === 0 ? (
					<p>Aucune tâche pour le moment.</p>
				) : (
					tasks.map((task, idx) => (
						<TaskDetails key={idx} {...task} />
					))
				)}
			</div>
		</div>
	);
};

export default Todolist;
