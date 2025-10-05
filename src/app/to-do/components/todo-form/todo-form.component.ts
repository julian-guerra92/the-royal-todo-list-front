import { Component, input, output, OnInit, effect, signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoItem } from '../../interfaces/TodoItem.interface';

@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './todo-form.component.html',
})
export class TodoFormComponent implements OnInit {
  existingTodo = input<TodoItem | null>(null);
  isVisible = input<boolean>(false);

  onSubmit = output<TodoItem>();
  onCancel = output<void>();

  todoForm!: FormGroup;

  isEditMode = computed(() => this.existingTodo() !== null);

  constructor(private fb: FormBuilder) {
    effect(() => {
      const todo = this.existingTodo();
      if (this.todoForm) {
        this.populateForm();
      }
    });
  }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      content: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      scheduledDate: ['', Validators.required],
      priority: [1, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  private populateForm() {
    const todo = this.existingTodo();
    if (todo && this.todoForm) {
      this.todoForm.patchValue({
        title: todo.title,
        content: todo.content,
        scheduledDate: this.formatDateForInput(todo.scheduledDate),
        priority: todo.priority
      });
    }
  }

  onFormSubmit() {
    if (this.todoForm.valid) {
      const formValue = this.todoForm.value;
      const existingTodo = this.existingTodo();
      const todoData: TodoItem = {
        ...formValue,
        scheduledDate: this.formatDateForBackend(formValue.scheduledDate),
        ...(this.isEditMode() && existingTodo?.id && { id: existingTodo.id })
      };
      this.onSubmit.emit(todoData);
      this.resetForm();
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancelClick() {
    this.resetForm();
    this.onCancel.emit();
  }

  private resetForm() {
    this.todoForm.reset({
      title: '',
      content: '',
      scheduledDate: '',
      priority: 1
    });
  }

  private markFormGroupTouched() {
    Object.keys(this.todoForm.controls).forEach(key => {
      const control = this.todoForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.todoForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['minlength']) return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
      if (field.errors['maxlength']) return `${fieldName} must not exceed ${field.errors['maxlength'].requiredLength} characters`;
      if (field.errors['min']) return `${fieldName} must be at least ${field.errors['min'].min}`;
      if (field.errors['max']) return `${fieldName} must not exceed ${field.errors['max'].max}`;
    }
    return '';
  }

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private formatDateForInput(dateString: string): string {
    if (!dateString) return '';
    return dateString.split('T')[0];
  }

  private formatDateForBackend(dateString: string): string {
    if (!dateString) return '';
    return `${dateString}T05:00:00.000Z`;
  }
}
