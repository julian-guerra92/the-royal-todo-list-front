import { Injectable, signal } from "@angular/core";
import { ToastMessage } from "../interfaces/toast-message.interface";

@Injectable({
  providedIn: 'root'
})
export class ToastNotificationService {
  private toastSignal = signal<ToastMessage | null>(null);

  toast = this.toastSignal.asReadonly();

  showToast(message: string, type: 'error' | 'success' | 'warning' | 'info' = 'error') {
    this.toastSignal.set({ message, type });

    setTimeout(() => {
      this.hideToast();
    }, 3000);
  }

  hideToast() {
    this.toastSignal.set(null);
  }
}
