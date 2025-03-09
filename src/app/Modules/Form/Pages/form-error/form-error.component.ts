import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.css'
})
export class FormErrorComponent {
  @Input() control: AbstractControl | null = null;

  // Método para comprobar si el control tiene errores
  get hasErrors(): boolean | undefined {
    return this.control?.invalid && this.control?.touched;
  }

  // Método para obtener el mensaje de error dependiendo del tipo
  getErrorMessage(): string {
    if (this.control?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (this.control?.hasError('min')) {
      return 'El valor debe ser mayor que 0';
    }
    if (this.control?.hasError('maxLength')) {
      return 'El valor es demasiado largo';
    }
    if (this.control?.hasError('onlyNumbers')) {
      return 'Solo se permiten números';
    }
    if (this.control?.hasError('pattern')) {
      return 'Formato incorrecto';
    }
    return '';
  }
}
