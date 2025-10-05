import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoFormComponent } from "../../components/todo-form/todo-form.component";
import { ModalButtonComponent } from "../../components/modal-button/modal-button.component";
import { TodoCardComponent } from "../../components/todo-card/todo-card.component";
import { ToastNotificationComponent } from "../../../shared/components/toast-notification/toast-notification.component";
import { GreatResetAnimationComponent } from "../../components/great-reset-animation/great-reset-animation.component";
import { TodoItem, CreateTodoRequest, UpdateTodoRequest } from '../../interfaces/TodoItem.interface';
import { SseTodoService } from '../../services/sse-todo.service';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-handler',
  imports: [TodoFormComponent, ModalButtonComponent, TodoCardComponent, ToastNotificationComponent, GreatResetAnimationComponent, CommonModule],
  templateUrl: './todo-handler.component.html',
})
export class TodoHandlerComponent implements OnInit {
  private sseTodoService = inject(SseTodoService);
  private todoService = inject(TodoService);

  showTodoModal = signal(false);
  todoToEdit = signal<TodoItem | null>(null);
  showPrimeAnimation = signal(false);
  primeMessage = signal<string>('');

  todos = this.todoService.todos;
  loading = this.todoService.loading;

  ngOnInit(): void {
    this.sseTodoService.connectToAll();
    this.todoService.loadTodos().subscribe();
    this.sseTodoService.getPrimeResetEvents().subscribe((message) => {
      this.showPrimeResetAnimation(message);
    });
  }

  openCreateTodoModal() {
    this.todoToEdit.set(null);
    this.showTodoModal.set(true);
  }

  openEditTodoModal(todo: TodoItem) {
    this.todoToEdit.set(todo);
    this.showTodoModal.set(true);
  }

  handleTodoSubmit(todoData: TodoItem) {
    if (todoData.id) {
      const updateData: UpdateTodoRequest = {
        title: todoData.title,
        content: todoData.content,
        scheduledDate: todoData.scheduledDate,
        priority: todoData.priority
      };
      this.todoService.updateTodo(todoData.id, updateData).subscribe({
        next: () => {
          this.todoService.loadTodos().subscribe();
        }
      });
    } else {
      const createData: CreateTodoRequest = {
        title: todoData.title,
        content: todoData.content,
        scheduledDate: todoData.scheduledDate,
        priority: todoData.priority
      };
      this.todoService.createTodo(createData).subscribe({
        next: () => {
          this.todoService.loadTodos().subscribe();
        }
      });
    }
    this.closeTodoModal();
  }

  closeTodoModal() {
    this.showTodoModal.set(false);
    this.todoToEdit.set(null);
  }

  handleTodoDelete(todoId: number) {
    this.todoService.deleteTodo(todoId).subscribe({
      next: () => {
        this.todoService.loadTodos().subscribe();
      }
    });
  }

  trackByTodoId(index: number, todo: TodoItem): string {
    return todo.id?.toString() || index.toString();
  }

  showPrimeResetAnimation(message: string) {
    this.primeMessage.set(message);
    this.showPrimeAnimation.set(true);

    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
      this.hidePrimeAnimation();
    }, 5000);
  }

  hidePrimeAnimation() {
    this.showPrimeAnimation.set(false);
    this.primeMessage.set('');
  }
}
