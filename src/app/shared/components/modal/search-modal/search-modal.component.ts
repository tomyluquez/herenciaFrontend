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
  showSuggestions: boolean = false;
  popularSearches = ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'];

  constructor(private _modalService: ModalService, private _router: Router) { }

  searchProducts() {
    //agregar un query search para que busque tanto en nombre como en categoria y que no sea exacta la busqueda
    this._router.navigate(['/Products'], {
      queryParams: { name: this.search },
    });
    this._modalService.closeModal();
  }
  getSuggestions() {
    return this.popularSearches.filter(item =>
      item.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  // Seleccionar sugerencia
  selectSuggestion(suggestion: string) {
    this.search = suggestion;
    this.searchProducts();
    this.showSuggestions = false;
  }

  // Limpiar búsqueda
  clearSearch() {
    this.search = '';
    this.showSuggestions = false;
    // Opcional: resetear resultados si es necesario
  }

  // Alternativamente, para mostrar sugerencias al focus
  onInputFocus() {
    if (this.search) {
      this.showSuggestions = true;
    }
  }
}
