import { Component, signal, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastNotificationService } from '../../services/toast-service';

@Component({
  selector: 'app-toast-notification',
  imports: [CommonModule],
  templateUrl: './toast-notification.component.html',
})
export class ToastNotificationComponent {
  constructor(public toastService: ToastNotificationService) {}

  getToastClasses(type: string): string {
    const baseClasses = 'alert';
    switch (type) {
      case 'error':
        return `${baseClasses} alert-error`;
      case 'success':
        return `${baseClasses} alert-success`;
      case 'warning':
        return `${baseClasses} alert-warning`;
      case 'info':
        return `${baseClasses} alert-info`;
      default:
        return `${baseClasses} alert-info`;
    }
  }

  closeToast() {
    this.toastService.hideToast();
  }
}
