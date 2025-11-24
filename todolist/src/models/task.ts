export interface Task {
    id: string;
    name: string;
    status: 'pending' | 'completed';
    date: Date;
    description?: string;
}