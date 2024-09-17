import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  isModalOpen = signal(false);

  constructor() {}

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  toggleModal() {
    this.isModalOpen.set(!this.isModalOpen());
  }
}
