import { Component } from '@angular/core';
import { BlockUI, BlockUIModule, NgBlockUI } from 'ng-block-ui';
import { SizeListTable } from '../../Models/Size-list-table.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PaginationEnum } from '../../../Other/Enums/pagination-enum';
import { ActivationStatusEnum } from '../../../Other/Enums/activation-status-enum';
import { NameAndId } from '../../../Other/Interface/NameValue.interface';
import { ISizeListVM, SearchSizePagedList } from '../../Interface/Size.interface';
import { SizesService } from '../../Services/sizes.service';
import { RSidebarService } from '../../../Other/Services/rsidebar.service';
import { ModalService } from '../../../Other/Services/modal.service';
import { AlertService } from '../../../Other/Services/alert.service';
import { SizeLlistVM } from '../../Models/Size-list.model';
import { ResponseMessages } from '../../../Other/Interface/ResponseMessages.Interface';
import { FilteringOptionsSizeListVM } from '../../Models/Filtering-options-size.list';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { RSidebarComponent } from '../../../../shared/components/rsidebar/rsidebar.component';
import { GeneralTableComponent } from '../../../Table/Pages/general-table/general-table.component';
import { ConfirmModalComponent } from '../../../../shared/components/modal/confirm-modal/confirm-modal.component';
import { SizeFormComponent } from '../size-form/size-form.component';

@Component({
  selector: 'app-size-list',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    BlockUIModule,
    RSidebarComponent,
    GeneralTableComponent,
    ConfirmModalComponent,
    SizeFormComponent
  ],
  templateUrl: './size-list.component.html',
  styleUrl: './size-list.component.css'
})
export class SizeListComponent {
  @BlockUI('size-list') blockUI!: NgBlockUI;
  pagedList!: SizeListTable

  form!: FormGroup

  page = PaginationEnum.Page;
  limit = PaginationEnum.Limit;

  defaultStatus = ActivationStatusEnum.Active;
  statesOptions!: NameAndId[];

  sizeIdSelected!: number;
  isEdit = false;
  sizeSelected!: ISizeListVM | null

  titleConfirm = ""

  constructor(private _sizeService: SizesService, private _rSidebarSerive: RSidebarService, private _modalService: ModalService, private _alertService: AlertService) {
    this.form = new FormGroup({
      Name: new FormControl(''),
      Status: new FormControl(this.defaultStatus)
    });

  }

  ngOnInit(): void {
    this.pagedList = new SizeListTable([], 0);
    if (this.pagedList) {
      this.pagedList.pageChange.subscribe((newPage) => {
        this.page = newPage;
        this.search();
      });

      this.pagedList.statusChange.subscribe((categoryId) => {
        this.isEdit = false;
        const category = this.getCategory(categoryId)
        this.sizeIdSelected = category.Id;
        this.titleConfirm = `Desea ${category ? category.IsActive ? "Desactivar" : "Activar" : ''} la categoria${category ? " " + category.Name : ''}?`
        this._modalService.openConfirm();
      });

      this.pagedList.edit.subscribe((categoryId) => {
        this.isEdit = true;
        this.sizeSelected = this.pagedList.Items.find(i => i.Id === categoryId)!;
        this._rSidebarSerive.openSidebar();
      });
    }
    this.init();

  }

  init() {
    this.blockUI.start();
    this._sizeService.getFilteringOptionsSizeList().subscribe((res: FilteringOptionsSizeListVM) => {
      if (res.HasErrors || res.HasWarnings) {
        this.blockUI.stop();
        return
      }

      this.statesOptions = res.Status
      this.blockUI.stop();
      this.search();
    })

  }

  parameters(): SearchSizePagedList {
    let parameters: SearchSizePagedList = {
      Name: this.form.controls['Name'].value,
      Pagination: { Page: this.page, Limit: this.limit },
      Status: this.form.controls['Status'].value,
    }

    return parameters;
  }

  search() {
    let params = this.parameters();
    this.getPagedList(params)
  }

  getPagedList(params: SearchSizePagedList) {
    this.blockUI.start();
    this._sizeService
      .getSizeList(params)
      .subscribe((res: SizeLlistVM) => {
        if (res.HasErrors) {
          this.blockUI.stop();
          return;
        }

        this.pagedList.updateData(res.Items, res.TotalItems);

        this.blockUI.stop();
      });
  }

  updateSizes() {
    this.search();
    this._rSidebarSerive.closeSidebar();
  }

  addCategory() {
    this.isEdit = true;
    this.sizeSelected = null;
    this._rSidebarSerive.openSidebar();
  }

  getCategory(id: number) {
    return this.pagedList.Items.find(i => i.Id === id)!
  }

  changeStatus() {
    this._modalService.closeConfirm();
    this.blockUI.start();
    this._sizeService.changeStatus(this.sizeIdSelected).subscribe((res: ResponseMessages) => {
      this._alertService.showAlerts(res);
      if (res.HasErrors || res.HasWarnings) {
        this.blockUI.stop();
        return
      }
      this.blockUI.stop();
      this.updateSizes();
    })
  }
}
