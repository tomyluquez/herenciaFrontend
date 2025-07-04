import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BlockUI, BlockUIModule, NgBlockUI } from 'ng-block-ui';
import { ICategoryVM } from '../../Interfaces/Categories.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../Services/category.service';
import { AlertService } from '../../../Other/Services/alert.service';
import { ResponseMessages } from '../../../Other/Interface/ResponseMessages.Interface';
import { CommonModule } from '@angular/common';
import { FormErrorComponent } from '../../../Form/Pages/form-error/form-error.component';
import { UploadImageService } from '../../../Other/Services/upload-image.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BlockUIModule, FormErrorComponent],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent implements OnInit, OnChanges {
  @BlockUI('category-form') blockUI!: NgBlockUI
  @BlockUI('image-block') imageBlockUI!: NgBlockUI;
  @Input() category!: ICategoryVM | null;
  @Output() newCategory = new EventEmitter<ICategoryVM>();

  form!: FormGroup
  loading = true;

  constructor(private _categoryService: CategoryService, private _alertService: AlertService, private _uploadImageService: UploadImageService) {
  }

  ngOnInit() {
    this.blockUI.start();
    this.createForm();
    this.blockUI.stop();
    this.loading = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['category'].firstChange) {
      this.category = changes['category'].currentValue;
      this.createForm();
    }
  }

  createForm() {
    this.form = new FormGroup({
      Image: new FormControl(this.category ? this.category.Image : null),
      Name: new FormControl(this.category ? this.category.Name : null, Validators.required)
    })
  }

  uploadCategory() {
    if (this.form.invalid) return;

    this.blockUI.start();
    const newCategory = this.getCategory();
    this._categoryService.saveCategory(newCategory).subscribe((res: ResponseMessages) => {
      this._alertService.showAlerts(res);
      if (res.HasSuccess) {
        this.category = newCategory;
        this.newCategory.emit(newCategory);
      }
      this.blockUI.stop();
    })
  }

  getCategory(): ICategoryVM {
    const newCategory = {
      Id: this.category ? this.category.Id : 0,
      Name: this.form.controls['Name'].value,
      Image: this.form.controls['Image'].value
    }
    return newCategory;
  }

  get image(): string {
    return this.form.controls['Image'].value || "";
  }

  removeImage() {
    this.form.controls['Image'].setValue("");
  }
  onImageSelected(e: any) {
    this.imageBlockUI.start();
    const file = e.target.files[0];

    if (file) {
      this._uploadImageService.uploadImage(file).subscribe((res: any) => {
        this.imageBlockUI.stop();
        const imageUrl = res.secure_url;
        this.form.controls['Image'].setValue(imageUrl);
      });
    }
  }
}
