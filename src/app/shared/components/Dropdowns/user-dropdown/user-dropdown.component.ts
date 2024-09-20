import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-dropdown.component.html',
  styleUrl: '../dropdown.css',
})
export class UserDropdownComponent {
  @Input({ required: true }) isOpen = false;
  @Input({ required: true }) isLoggin = false;
}
