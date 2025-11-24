import data from "../data.json";
import type { Task } from "../models/task";
import type { TodoList } from "../models/todolist";

type RawTask = {
    id: string;
    name: string;
    status: "pending" | "completed";
    date: string | Date;
    description?: string;
};

const toTask = (t: RawTask): Task => ({
    id: t.id,
    name: t.name,
    status: t.status,
    date: t.date instanceof Date ? t.date : new Date(t.date),
    description: t.description,
});

// Initialize an in-memory store from data.json
let store: TodoList = { tasks: [] };
(() => {
    const payload = data as unknown;

    if (
        typeof payload === "object" &&
        payload !== null &&
        "tasks" in payload &&
        Array.isArray((payload as { tasks: unknown }).tasks)
    ) {
        const raw = (payload as { tasks: RawTask[] }).tasks;
        store.tasks = raw.map(toTask);
        return;
    }

    if (Array.isArray(payload as unknown[])) {
        const raw = payload as RawTask[];
        store.tasks = raw.map(toTask);
        return;
    }

    store = { tasks: [] };
})();

export const getTasks = async (): Promise<TodoList> => {
    return store;
};

export const createTask = async (task: Omit<Task, "id"> & { id?: string }): Promise<Task> => {
    const newTask: Task = {
        id: task.id ?? Date.now().toString(),
        name: task.name,
        status: task.status,
        date: task.date instanceof Date ? task.date : new Date(task.date as string),
        description: task.description,
    };

    store.tasks.push(newTask);
    return newTask;
};

export const editTask = async (taskId: string, newTask: Partial<Task>): Promise<Task | null> => {
    const idx = store.tasks.findIndex((t) => t.id === taskId);
    if (idx === -1) return null;

    const updated: Task = {
        ...store.tasks[idx],
        ...newTask,
        date: newTask.date ?? store.tasks[idx].date,
    };

    store.tasks[idx] = updated;
    return updated;
};

export const deleteTask = async (taskId: string): Promise<boolean> => {
    const idx = store.tasks.findIndex((t) => t.id === taskId);
    if (idx === -1) return false;
    store.tasks.splice(idx, 1);
    return true;
};