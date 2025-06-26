import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, TitleStrategy } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Models/Product.model';
import { BlockUI, BlockUIModule, NgBlockUI } from 'ng-block-ui';
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
import { UploadImageService } from '../../../Other/Services/upload-image.service';

@Component({
  selector: 'app-form-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule, FormsModule, FormErrorComponent, BlockUIModule],
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.css'
})
export class FormProductComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  @BlockUI('image-block') imageBlockUI!: NgBlockUI;
  loading = true;

  productId?: number;
  product!: IProduct

  sizeForm!: FormGroup
  form!: FormGroup
  formModel!: Form

  categories!: NameAndId[]
  sizes!: NameAndId[]
  sizesSelected: IProductVariants[] = [];
  relatedProducts!: NameAndId[];

  constructor(private _route: ActivatedRoute,
    private _productService: ProductService,
    private _alertService: AlertService,
    private _location: Location,
    private _variantsService: VariantsService,
    private _uploadImageService: UploadImageService
  ) {
    const productId = this._route.snapshot.params['productId'];
    if (productId) this.productId = productId;
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.blockUI.start();
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
      this.relatedProducts = res.RelatedProducts
      this.blockUI.stop();
      if (this.productId) {
        this._productService.getProductById(this.productId).subscribe((res: Products) => {
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
      Price: new FormControl(this.product ? this.product.Price : 0, [Validators.required, Validators.min(0),]),
      Description: new FormControl(this.product ? this.product.Description : ''),
      Images: new FormControl(this.product ? this.product.Images : []),
      Category: new FormControl(this.product ? this.product.CategoryId : null, Validators.required),
      Discount: new FormControl(this.product ? this.product.Discount : 0, []),
      Cost: new FormControl(this.product ? this.product.Cost : 0, [Validators.required, Validators.min(0),]),
      IsPromotional: new FormControl(this.product ? this.product.IsPromotional : false),
      PromotionalPrice: new FormControl(this.product ? this.product.PromotionalPrice : 0, []),
      Rentability: new FormControl(this.product ? this.product.Rentability : 0, []),
      RelatedProducts: new FormControl(this.product ? this.product.RelatedProductIds : [])
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

    this.blockUI.start();
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
      Variants: this.sizesSelected && this.sizesSelected.length > 0 ? this.sizesSelected : [],
      Rentability: Number(this.form.controls['Rentability'].value),
      RelatedProductIds: this.form.controls['RelatedProducts'].value
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

  get images(): string[] {
    return this.form.controls['Images'].value || [];
  }

  removeImage(index: number) {
    const currentImages = this.form.controls['Images'].value || [];
    const updatedImages = currentImages.filter((_: string, i: number) => i !== index);
    this.form.controls['Images'].setValue(updatedImages);
  }
  onImageSelected(e: any) {
    this.imageBlockUI.start();
    const file = e.target.files[0];

    if (file) {
      this._uploadImageService.uploadImage(file).subscribe((res: any) => {
        this.imageBlockUI.stop();
        const imageUrl = res.secure_url;
        const currentImages = this.form.controls['Images'].value || [];
        this.form.controls['Images'].setValue([...currentImages, imageUrl]);
      });
    }
  }


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

  calculateRentability() {
    const isPromotional = this.form.controls['IsPromotional'].value;
    const cost = Number(this.form.controls['Cost'].value);
    let price = Number(this.form.controls['Price'].value);
    let promotionalPrice = Number(this.form.controls['PromotionalPrice'].value);

    if (cost > 0) {
      // Si el producto es promocional, calcular rentabilidad con el precio promocional
      const effectivePrice = isPromotional ? promotionalPrice : price;
      const rentability = ((effectivePrice - cost) / cost) * 100;
      this.form.controls['Rentability'].setValue(rentability);
    }
  }

  calculatePrice() {
    this.calculateRentability();
  }

  calculatePromotionalPrice() {
    if (this.form.controls['IsPromotional'].value) {
      const price = Number(this.form.controls['Price'].value);
      const discount = Number(this.form.controls['Discount'].value);

      // Calcular precio promocional si hay descuento
      if (discount > 0) {
        const promotionalPrice = price * (1 - discount / 100);
        this.form.controls['PromotionalPrice'].setValue(promotionalPrice);
      }

      // Recalcular rentabilidad
      this.calculateRentability();
    }
  }

  calculateDiscountFromPromotionalPrice() {
    if (this.form.controls['IsPromotional'].value) {
      const price = Number(this.form.controls['Price'].value);
      const promotionalPrice = Number(this.form.controls['PromotionalPrice'].value);

      // Evitar divisiones por cero y asegurar valores válidos
      if (price > 0 && promotionalPrice > 0) {
        const discount = ((price - promotionalPrice) / price) * 100;
        this.form.controls['Discount'].setValue(discount.toFixed(2));
      }

      // Recalcular rentabilidad
      this.calculateRentability();
    }
  }

  onRentabilityChange(): void {
    const rentability = this.form.controls['Rentability'].value;
    const cost = this.form.controls['Cost'].value;

    if (!cost || !rentability) return;

    if (this.form.controls['IsPromotional'].value) {
      // Si es promocional, calcular el precio promocional
      const discount = this.form.controls['Discount'].value || 0;
      const promotionalPrice = cost * (1 + rentability / 100) * (1 - discount / 100);
      this.form.controls['PromotionalPrice'].setValue(promotionalPrice.toFixed(2));
    } else {
      // Si no es promocional, calcular el precio de venta normal
      const price = cost * (1 + rentability / 100);
      this.form.controls['Price'].setValue(price.toFixed(2));
    }
  }

}
