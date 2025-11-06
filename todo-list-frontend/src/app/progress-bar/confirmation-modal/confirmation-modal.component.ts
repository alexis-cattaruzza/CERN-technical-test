import { Component, EventEmitter, Input,  Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  template: `
    <div class="modal-backdrop" *ngIf="show" (click)="onCancel()">
      <div class="modal" (click)="$event.stopPropagation()">
        <h3>Confirm</h3>
        <p>{{ message }}</p>
        <div class="buttons">
          <button (click)="onCancel()">Cancel</button>
          <button (click)="onConfirm()" class="delete">Delete</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
  @Input() message = '';
  @Input() show = false;
  @Output() confirm = new EventEmitter<boolean>();

  onConfirm(): void {
    this.confirm.emit(true);
  }

  onCancel(): void {
    this.confirm.emit(false);
  }

}
