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
  isChangingImage: boolean = false;
  currentImageIndex = 0;
  showLightbox: boolean = false;
  constructor() { }

  ngOnChanges() {
    this.imageSelected = this.images[0];
  }

  selectImage(index: number, event?: Event): void {
    if (event) event.stopPropagation();

    this.isChangingImage = true;
    setTimeout(() => {
      this.currentImageIndex = index;
      this.imageSelected = this.images[index];
    }, 150);
  }

  nextImage(event?: Event): void {
    if (event) event.stopPropagation();

    const currentIndexImage = this.images.findIndex(
      (i) => i === this.imageSelected
    );

    if (currentIndexImage === this.images.length - 1) {
      this.selectImage(0);
      return;
    }

    this.selectImage(currentIndexImage + 1);
  }

  prevImage(event?: Event): void {
    if (event) event.stopPropagation();

    const currentIndexImage = this.images.findIndex(
      (i) => i == this.imageSelected
    );

    if (currentIndexImage === 0) {
      this.selectImage(this.images.length - 1);
      return;
    }

    this.selectImage(currentIndexImage - 1);
  }

  // Métodos para controlar el lightbox
  openLightbox() {
    this.showLightbox = true;
    document.body.style.overflow = 'hidden'; // Bloquear scroll
  }

  closeLightbox() {
    this.showLightbox = false;
    document.body.style.overflow = '';
  }



}
