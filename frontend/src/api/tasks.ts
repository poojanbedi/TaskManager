import { apiClient } from "./client";

// Mirrors com.pb.TaskManager.model.Task
export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

export type NewTask = Omit<Task, "id">;

export const tasksApi = {
  getAll: () => apiClient.get<Task[]>("/tasks"),
  getById: (id: number) => apiClient.get<Task>(`/tasks/${id}`),
  create: (task: NewTask) => apiClient.post<Task>("/tasks", task),
  remove: (id: number) => apiClient.delete(`/tasks/${id}`),
};