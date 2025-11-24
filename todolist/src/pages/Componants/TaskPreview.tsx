import type { Task } from "../../models/task";

export default function TaskPreview({ name, status }: Readonly<Task>) {
  return (
    <div>
      <h3>{name}</h3>
      <p>Status: {status}</p>
    </div>
  );
}
