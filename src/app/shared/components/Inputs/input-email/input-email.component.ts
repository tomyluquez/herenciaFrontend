import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-email',
  standalone: true,
  imports: [],
  templateUrl: './input-email.component.html',
  styleUrl: './input-email.component.css',
})
export class InputEmailComponent {
  @Input() placeholder!: string;
  @Input() isLoading: boolean = false;

  @Output() inputEmail: EventEmitter<string> = new EventEmitter();

  constructor() {}

  onChange(event: Event) {
    this.inputEmail.emit((event.target as HTMLInputElement).value);
  }
}
