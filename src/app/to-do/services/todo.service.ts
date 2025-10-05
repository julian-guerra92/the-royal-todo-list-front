import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { TodoItem, CreateTodoRequest, UpdateTodoRequest } from '../interfaces/TodoItem.interface';
import { Observable } from 'rxjs';
import { tap, catchError, of } from 'rxjs';
import { ToastNotificationService } from '../../shared/services/toast-service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private http = inject(HttpClient);
  private toastService = inject(ToastNotificationService);
  private baseUrl = `${environment.baseUrl}/to-do`;

  private todosSignal = signal<TodoItem[]>([]);
  private loadingSignal = signal<boolean>(false);

  todos = this.todosSignal.asReadonly();
  loading = this.loadingSignal.asReadonly();

  loadTodos(): Observable<TodoItem[]> {
    this.loadingSignal.set(true);

    return this.http.get<TodoItem[]>(this.baseUrl).pipe(
      tap(todos => {
        this.todosSignal.set(todos);
        this.loadingSignal.set(false);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error loading todos:', error);
        const message = error.error?.message || 'Error loading todos';
        this.toastService.showToast(message, 'error');
        this.loadingSignal.set(false);
        return of([]);
      })
    );
  }

  createTodo(todo: CreateTodoRequest): Observable<TodoItem> {
    this.loadingSignal.set(true);

    return this.http.post<TodoItem>(this.baseUrl, todo).pipe(
      tap(newTodo => {
        this.loadingSignal.set(false);
        this.toastService.showToast('Todo created successfully', 'success');
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error creating todo:', error);
        const message = error.error?.message || 'Error creating todo';
        this.toastService.showToast(message, 'error');
        this.loadingSignal.set(false);
        throw error;
      })
    );
  }

  updateTodo(id: number, updates: UpdateTodoRequest): Observable<TodoItem> {
    this.loadingSignal.set(true);

    return this.http.patch<TodoItem>(`${this.baseUrl}/${id}`, updates).pipe(
      tap(updatedTodo => {
        this.loadingSignal.set(false);
        this.toastService.showToast('Todo updated successfully', 'success');
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error updating todo:', error);
        const message = error.error?.message || 'Error updating todo';
        this.toastService.showToast(message, 'error');
        this.loadingSignal.set(false);
        throw error;
      })
    );
  }

  deleteTodo(id: number): Observable<any> {
    this.loadingSignal.set(true);

    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        this.loadingSignal.set(false);
        this.toastService.showToast('Todo deleted successfully', 'success');
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error deleting todo:', error);
        const message = error.error?.message || 'Error deleting todo';
        this.toastService.showToast(message, 'error');
        this.loadingSignal.set(false);
        throw error;
      })
    );
  }

  getTodoById(id: number): TodoItem | undefined {
    return this.todosSignal().find(todo => todo.id === id);
  }
}
