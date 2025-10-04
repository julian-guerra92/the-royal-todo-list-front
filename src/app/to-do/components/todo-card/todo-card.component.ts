import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoItem } from '../../interfaces/TodoItem.interface';

@Component({
  selector: 'app-todo-card',
  imports: [CommonModule],
  templateUrl: './todo-card.component.html',
})
export class TodoCardComponent {
  todo = input.required<TodoItem>();

  onEdit = output<TodoItem>();
  onDelete = output<string>();

  priorityClass = computed(() => {
    const priority = this.todo().priority;
    if (priority >= 8) return 'badge-error';
    if (priority >= 5) return 'badge-warning';
    return 'badge-success';
  });

  priorityText = computed(() => {
    const priority = this.todo().priority;
    if (priority >= 8) return 'High';
    if (priority >= 5) return 'Medium';
    return 'Low';
  });

  formattedDate = computed(() => {
    const date = new Date(this.todo().date);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  });

  handleEdit() {
    this.onEdit.emit(this.todo());
  }

  handleDelete() {
    const todoId = this.todo().id;
    if (todoId) {
      this.onDelete.emit(todoId);
    }
  }
}
