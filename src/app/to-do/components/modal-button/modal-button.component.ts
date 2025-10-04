import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal-button',
  imports: [],
  templateUrl: './modal-button.component.html',
})
export class ModalButtonComponent {
  title = input<string>('');
  buttonClass = input<string>(
    'btn btn-primary btn-circle fixed bottom-20 right-6 z-50 shadow-lg hover:shadow-xl transition-shadow duration-200'
  );
  iconPath = input<string>('M12 4v16m8-8H4');
  iconClass = input<string>('w-6 h-6');

  buttonClick = output<void>();

  onButtonClick() {
    this.buttonClick.emit();
  }
}
