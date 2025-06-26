import { Component } from '@angular/core';
import { BlockUI, BlockUIModule, NgBlockUI } from 'ng-block-ui';
import { DiscountCouponListTable } from '../../Models/Discount-coupon-table-list.model';
import { PaginationEnum } from '../../Enums/pagination-enum';
import { ActivationStatusEnum } from '../../Enums/activation-status-enum';
import { NameAndId } from '../../Interface/NameValue.interface';
import { IDiscountCoupon, SearchCouponList } from '../../Interface/DiscountCoupon.interface';
import { ConfigService } from '../../../Config/Services/config.service';
import { RSidebarService } from '../../Services/rsidebar.service';
import { DiscountCouponPagedListVM } from '../../Models/Discount-coupon-paged-list.model';
import { CouponDiscountEditorComponent } from '../coupon-discount-editor/coupon-discount-editor.component';
import { RSidebarComponent } from '../../../../shared/components/rsidebar/rsidebar.component';
import { GeneralTableComponent } from '../../../Table/Pages/general-table/general-table.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coupon-discount-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule, FormsModule, GeneralTableComponent, BlockUIModule, RSidebarComponent, CouponDiscountEditorComponent],
  templateUrl: './coupon-discount-list.component.html',
  styleUrl: './coupon-discount-list.component.css'
})
export class CouponDiscountListComponent {
  @BlockUI('discountCoupon-list') blockUI!: NgBlockUI
  pagedList!: DiscountCouponListTable;

  form!: FormGroup


  page = PaginationEnum.Page;
  limit = PaginationEnum.Limit;

  defaultStatus = ActivationStatusEnum.Active;

  coupons!: NameAndId[]
  statesOptions!: NameAndId[]

  isEdit = false
  couponSelected!: IDiscountCoupon | null;

  constructor(private _configService: ConfigService, private _rSidebarSerive: RSidebarService) {
    this.form = new FormGroup({
      Name: new FormControl(''),
      Status: new FormControl(this.defaultStatus)
    });
  }

  ngOnInit(): void {
    this.pagedList = new DiscountCouponListTable([], 0);
    if (this.pagedList) {
      this.pagedList.pageChange.subscribe((newPage) => {
        this.page = newPage;
        this.search();
      });

      this.pagedList.change.subscribe((configId) => {
        this.addCoupon(configId)
      });
    }
    this.init();

  }

  init() {
    this.blockUI.start();
    this.search();

  }

  parameters(): SearchCouponList {
    let parameters: SearchCouponList = {
      Pagination: { Page: this.page, Limit: this.limit },
      Status: this.form.controls['Status'].value,
      Name: this.form.controls['Name'].value
    }

    return parameters;
  }

  search() {
    let params = this.parameters();
    this.getPagedList(params)
  }

  getPagedList(params: SearchCouponList) {
    this.blockUI.start();
    this._configService
      .getDiscountCoupons(params)
      .subscribe((res: DiscountCouponPagedListVM) => {
        console.log(res)
        if (res.HasErrors) {
          this.blockUI.stop();
          return;
        }

        this.pagedList.updateData(res.Items, res.TotalItems);

        this.blockUI.stop();
      });
  }

  updateCoupon() {
    this.search();
    this.isEdit = false;
    this._rSidebarSerive.closeSidebar();
  }

  addCoupon(couponId = 0) {
    if (couponId) {
      this.couponSelected = this.pagedList.Items.find(i => i.Id === couponId)!;
    } else this.couponSelected = null;

    this.isEdit = true;
    this._rSidebarSerive.openSidebar();
  }
}
