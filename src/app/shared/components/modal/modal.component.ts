import { Component, effect, Input } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { CommonModule } from '@angular/common';
import { ShadowBgComponent } from '../shadow-bg/shadow-bg.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ShadowBgComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input({ required: true }) title!: string;
  isOpen = true;

  constructor(private _modalService: ModalService) {
    effect(() => {
      this.isOpen = this._modalService.isModalOpen();
    });
  }

  closeSidebar() {
    this._modalService.closeModal();
  }
}
