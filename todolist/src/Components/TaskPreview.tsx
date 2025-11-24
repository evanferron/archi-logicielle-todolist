import { useState } from "react";
import type { Task } from "../models/task";
import { TaskDetails } from "./TaskDetails";

type Props = {
  task: Readonly<Task>;
  onChange?: (task: Task) => void;
};

export const TaskPreview = ({ task, onChange }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          cursor: "pointer",
          padding: "0.5rem",
          border: "1px solid #ddd",
          borderRadius: 6,
          marginBottom: 8,
          background: "white",
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0 }}>{task.name}</h3>
        <p style={{ margin: 0 }}>{task.status === "pending" ? "✗" : "✓"}</p>
      </button>

      {open && (
        <div
          tabIndex={0}
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            alignSelf: "center",
            width: "15rem",
          }}
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            style={{
              background: "rgba(208, 208, 208, 1)",
              padding: 20,
              borderRadius: 8,
              minWidth: 320,
              maxWidth: "90%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button onClick={() => setOpen(false)}>Fermer</button>
            </div>
            <TaskDetails task={task} onChange={onChange} />
          </div>
        </div>
      )}
    </>
  );
};
