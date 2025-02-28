import { Component, effect, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShadowBgComponent } from '../../../components/shadow-bg/shadow-bg.component';
import { ModalService } from '../../../../services/modal.service';
@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [CommonModule, ShadowBgComponent],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css',
})
export class ConfirmModalComponent {
  @Input({ required: true }) title!: string;
  @Output() confirm: EventEmitter<boolean> = new EventEmitter(false);
  isOpen = true;

  constructor(private _modalService: ModalService) {
    effect(() => {
      this.isOpen = this._modalService.isConfirmOpen();
    });
  }

  closeConfirm() {
    this._modalService.closeConfirm();
  }

  confirmAction() {
    this.confirm.emit(true);
  }
}
