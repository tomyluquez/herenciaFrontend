import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.css',
})
export class InputTextComponent {
  @Input() placeholder!: string;
  @Input() isLoading: boolean = false;

  @Output() inputText: EventEmitter<string> = new EventEmitter();

  constructor() { }

  onChange(event: Event) {
    setTimeout(() => this.inputText.emit((event.target as HTMLInputElement).value), 100);
  }
}
