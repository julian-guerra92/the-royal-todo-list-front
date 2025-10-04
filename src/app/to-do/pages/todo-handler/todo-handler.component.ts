import { Component } from '@angular/core';
import { TodoFormComponent } from "../../components/Todo-form/Todo-form.component";
import { ModalButtonComponent } from "../../components/modal-button/modal-button.component";
import { TodoCardComponent } from "../../components/todo-card/todo-card.component";
import { TodoItem } from '../../interfaces/TodoItem.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-handler',
  imports: [TodoFormComponent, ModalButtonComponent, TodoCardComponent, CommonModule],
  templateUrl: './todo-handler.component.html',
})
export class TodoHandlerComponent {
  showTodoModal = false;
  todoToEdit: TodoItem | null = null;

  // Example data
  todos: TodoItem[] = [
    {
      id: '1',
      title: 'Complete Angular project',
      content: 'Finish the todo list application with all the required features including CRUD operations, modal forms, and responsive design.',
      date: '2025-10-10',
      priority: 8
    },
    {
      id: '2',
      title: 'Review DaisyUI documentation',
      content: 'Study the latest DaisyUI components and implement them in the current project.',
      date: '2025-10-08',
      priority: 5
    },
    {
      id: '3',
      title: 'Setup CI/CD pipeline',
      content: 'Configure automated testing and deployment pipeline for the application.',
      date: '2025-10-15',
      priority: 3
    }
  ];

  openCreateTodoModal() {
    this.todoToEdit = null;
    this.showTodoModal = true;
  }

  openEditTodoModal(todo: TodoItem) {
    this.todoToEdit = todo;
    this.showTodoModal = true;
  }

  handleTodoSubmit(todoData: TodoItem) {
    if (todoData.id) {
      console.log('Updating todo:', todoData);
    } else {
      console.log('Creating new todo:', todoData);
    }
    this.closeTodoModal();
  }

  closeTodoModal() {
    this.showTodoModal = false;
    this.todoToEdit = null;
  }

  handleTodoDelete(todoId: string) {
    console.log('Deleting todo with ID:', todoId);
    this.todos = this.todos.filter(todo => todo.id !== todoId);
  }

  trackByTodoId(index: number, todo: TodoItem): string {
    return todo.id || index.toString();
  }
}
