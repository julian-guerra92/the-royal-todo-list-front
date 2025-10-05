import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-great-reset-animation',
  imports: [CommonModule],
  templateUrl: './great-reset-animation.component.html',
})
export class GreatResetAnimationComponent {
  @Input() isVisible: boolean = false;
  @Input() message: string = '';
  @Output() onAnimationComplete = new EventEmitter<void>();

  onAnimationClick() {
    this.onAnimationComplete.emit();
  }
}
