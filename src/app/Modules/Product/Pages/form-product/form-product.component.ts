import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, TitleStrategy } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Models/Product.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { CategoryService } from '../../../Category/Services/category.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { Form } from '../../../Form/Models/Form.model';
import { NameAndId } from '../../../Other/Interface/NameValue.interface';
import { SizesService } from '../../../Size/Services/sizes.service';
import { CustomValidators } from '../../../Form/Validators/Custom-validator';
import { FormErrorComponent } from '../../../Form/Pages/form-error/form-error.component';
import { ResponseMessages } from '../../../Other/Interface/ResponseMessages.Interface';
import { IProduct, IProductVariants, Products } from '../../Interface/Products.interfaces';
import { ActivationStatusEnum } from '../../../Other/Enums/activation-status-enum';
import { CategoryListVM, SearchCategoriesPagedList } from '../../../Category/Interfaces/Categories.interface';
import { AlertService } from '../../../Other/Services/alert.service';
import { PaginationEnum } from '../../../Other/Enums/pagination-enum';
import { VariantsService } from '../../../Variant/Services/variants.service';
import { FilteringOptionsProductStockVM } from '../../../Variant/Models/Filtering-options-product-stock.model';

@Component({
  selector: 'app-form-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule, FormsModule, FormErrorComponent],
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.css'
})
export class FormProductComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  loading = true;

  productId?: number;
  product!: IProduct

  sizeForm!: FormGroup
  form!: FormGroup
  formModel!: Form

  categories!: NameAndId[]
  sizes!: NameAndId[]
  sizesSelected: IProductVariants[] = [];

  constructor(private _route: ActivatedRoute,
    private _productService: ProductService,
    private _alertService: AlertService,
    private _categoryService: CategoryService,
    private _sizeService: SizesService,
    private _location: Location,
    private _variantsService: VariantsService
  ) {
    const productId = this._route.snapshot.params['productId'];
    if (productId) this.productId = productId;
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.blockUI.start('Cargando...');
    const params: SearchCategoriesPagedList = {
      Name: "",
      Pagination: { Page: PaginationEnum.Page, Limit: 1000 },
      Status: ActivationStatusEnum.Active
    }
    this._variantsService.getFilteringOptionsProductStock().subscribe((res: FilteringOptionsProductStockVM) => {
      if (res.HasErrors || res.HasWarnings) {
        this.blockUI.stop();
        return
      }

      this.categories = res.Categories;
      this.sizes = res.Sizes
      this.blockUI.stop();
      if (this.productId) {
        this._productService.getProductById(this.productId).subscribe((res: Products) => {
          console.log(res);
          if (res.HasErrors) {
            this._alertService.showAlerts(res);
            this.blockUI.stop();
            return;
          }

          this.product = res.Items[0];
          this.createForm(); // Ahora se ejecuta después de asignar this.product
          this.blockUI.stop();
          this.loading = false;
        });
      } else {
        this.createForm(); // Se ejecuta aquí si no hay productId
        this.blockUI.stop();
        this.loading = false;
      }
    })

  }


  createForm() {

    this.form = new FormGroup({
      Name: new FormControl(this.product ? this.product.Name : '', [Validators.required, Validators.maxLength(100)]),
      Price: new FormControl(this.product ? this.product.Price : 0, [Validators.required, Validators.min(0), CustomValidators.onlyNumbers()]),
      Description: new FormControl(this.product ? this.product.Description : ''),
      Images: new FormControl(this.product ? this.product.Images : ''),
      Category: new FormControl(this.product ? this.product.CategoryId : '', Validators.required),
      Discount: new FormControl(this.product ? this.product.Discount : 0, [CustomValidators.onlyNumbers()]),
      Cost: new FormControl(this.product ? this.product.Cost : 0, [Validators.required, Validators.min(0), CustomValidators.onlyNumbers()]),
      IsPromotional: new FormControl(this.product ? this.product.IsPromotional : false),
      PromotionalPrice: new FormControl(this.product ? this.product.PromotionalPrice : '', [CustomValidators.onlyNumbers()]),
    });

    this.sizeForm = new FormGroup({
      Size: new FormControl(null),
      Quantity: new FormControl(''),
    })

    if (this.product && this.product.Variants && this.product.Variants.length > 0) {
      this.fillSizes();
    }
  }

  fillSizes() {
    this.product.Variants!.forEach(v => {
      this.sizesSelected.push(v)
    })
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.blockUI.start('Cargando...');
    const newProduct: IProduct = {
      Id: this.product ? this.product.Id : 0,
      Name: this.form.controls['Name'].value,
      Price: Number(this.form.controls['Price'].value),
      Description: this.form.controls['Description'].value,
      Images: this.form.controls['Images'].value,
      CategoryName: null,
      CategoryId: Number(this.form.controls['Category'].value),
      Discount: Number(this.form.controls['Discount'].value),
      Cost: Number(this.form.controls['Cost'].value),
      IsActive: this.product ? this.product.IsActive : true,
      IsPromotional: this.form.controls['IsPromotional'].value,
      PromotionalPrice: this.form.controls['IsPromotional'].value ? Number(this.form.controls['PromotionalPrice'].value) : 0,
      Variants: this.sizesSelected && this.sizesSelected.length > 0 ? this.sizesSelected : []
    }

    this._productService.saveProduct(newProduct).subscribe((res: ResponseMessages) => {
      this._alertService.showAlerts(res);
      if (res.HasErrors) {
        this.blockUI.stop();
        return;
      }
      this.blockUI.stop();
      this._location.back();
    })

  }

  removeImage(index: number) { }
  onImageSelected(e: Event) { }


  addSize() {
    const size = this.sizes.find(s => s.Id === this.sizeForm.controls['Size'].value)!;
    const sizeIndex = this.sizesSelected.findIndex(s => s.SizeId === size.Id);
    const quantity = Number(this.sizeForm.controls['Quantity'].value)

    if (sizeIndex !== -1) {
      this.sizesSelected[sizeIndex].Stock += quantity;
    } else {
      this.sizesSelected.push({
        Id: 0,
        Stock: quantity,
        Name: size.Name,
        SizeId: size.Id,
        ProductId: this.product ? this.product.Id : 0
      });
    }

    this.sizeForm.controls['Size'].setValue(null)
    this.sizeForm.controls['Quantity'].setValue("")
  }


  removeSize(sizeId: number) {
    this.sizesSelected = this.sizesSelected.filter(s => s.Id !== sizeId)
  }

  calculatePromotionalPrice() {
    if (this.form.controls['IsPromotional'].value) {
      this.form.controls['PromotionalPrice'].setValue(this.form.controls['Price'].value * (1 - this.form.controls['Discount'].value / 100));
    }
  }

}
