import { Component } from '@angular/core';
import { ModalService } from '../../../../Modules/Other/Services/modal.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-modal.component.html',
  styleUrl: './search-modal.component.css',
})
export class SearchModalComponent {
  search!: string;

  constructor(private _modalService: ModalService, private _router: Router) { }

  searchProducts() {
    //agregar un query search para que busque tanto en nombre como en categoria y que no sea exacta la busqueda
    this._router.navigate(['/Products'], {
      queryParams: { name: this.search },
    });
    this._modalService.closeModal();
  }
}
