import { Component } from '@angular/core';
import { InputTextComponent } from '../../shared/components/Inputs/input-text/input-text.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [InputTextComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {}
