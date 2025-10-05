export interface TodoItem {
  id?: number;
  title: string;
  content: string;
  scheduledDate: string;
  priority: number;
}

export interface CreateTodoRequest {
  title: string;
  content: string;
  scheduledDate: string;
  priority: number;
}

export interface UpdateTodoRequest {
  title?: string;
  content?: string;
  scheduledDate?: string;
  priority?: number;
}
