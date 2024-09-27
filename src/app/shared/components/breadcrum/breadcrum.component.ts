import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BreadcrumItem } from '../../../interfaces/Shared.interfaces';

@Component({
  selector: 'app-breadcrum',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrum.component.html',
  styleUrl: './breadcrum.component.css',
})
export class BreadcrumComponent {
  @Input() items!: BreadcrumItem[];

  constructor() {}
}
