import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements OnChanges {
  @Input() images!: string[];

  imageSelected!: string;

  constructor() {}

  ngOnChanges() {
    this.imageSelected = this.images[0];
  }

  selectImage(index: number): void {
    this.imageSelected = this.images[index];
  }

  nextImage(): void {
    const currentIndexImage = this.images.findIndex(
      (i) => i === this.imageSelected
    );
    console.log(currentIndexImage);

    if (currentIndexImage === this.images.length - 1) {
      this.selectImage(0);
      return;
    }

    this.selectImage(currentIndexImage + 1);
  }

  prevImage(): void {
    const currentIndexImage = this.images.findIndex(
      (i) => i == this.imageSelected
    );

    if (currentIndexImage === 0) {
      this.selectImage(this.images.length - 1);
      return;
    }

    this.selectImage(currentIndexImage - 1);
  }
}
