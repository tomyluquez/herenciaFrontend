import { Component } from '@angular/core';
import { BlockUI, BlockUIModule, NgBlockUI } from 'ng-block-ui';
import { CategoryListTable } from '../../Models/Category-list-table.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationEnum } from '../../../Other/Enums/pagination-enum';
import { ActivationStatusEnum } from '../../../Other/Enums/activation-status-enum';
import { NameAndId } from '../../../Other/Interface/NameValue.interface';
import { CategoryService } from '../../Services/category.service';
import { RSidebarService } from '../../../Other/Services/rsidebar.service';
import { CategoryListVM, ICategoryVM, SearchCategoriesPagedList } from '../../Interfaces/Categories.interface';
import { FilteringOptionsCategoryListVM } from '../../Models/Filtering-options-category-list';
import { RSidebarComponent } from '../../../../shared/components/rsidebar/rsidebar.component';
import { GeneralTableComponent } from '../../../Table/Pages/general-table/general-table.component';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { ModalService } from '../../../Other/Services/modal.service';
import { ConfirmModalComponent } from '../../../../shared/components/modal/confirm-modal/confirm-modal.component';
import { ResponseMessages } from '../../../Other/Interface/ResponseMessages.Interface';
import { AlertService } from '../../../Other/Services/alert.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule, BlockUIModule, RSidebarComponent, GeneralTableComponent, CategoryFormComponent, ConfirmModalComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
  @BlockUI('category-list') blockUI!: NgBlockUI;
  pagedList!: CategoryListTable

  form!: FormGroup

  page = PaginationEnum.Page;
  limit = PaginationEnum.Limit;

  defaultStatus = ActivationStatusEnum.Active;
  statesOptions!: NameAndId[];

  categoryIdSelected!: number;
  isEdit = false;
  categorySelected!: ICategoryVM | null

  titleConfirm = ""

  constructor(private _categoryService: CategoryService, private _rSidebarSerive: RSidebarService, private _modalService: ModalService, private _alertService: AlertService) {
    this.form = new FormGroup({
      Name: new FormControl(''),
      Status: new FormControl(this.defaultStatus)
    });

  }

  ngOnInit(): void {
    this.pagedList = new CategoryListTable([], 0);
    if (this.pagedList) {
      this.pagedList.pageChange.subscribe((newPage) => {
        this.page = newPage;
        this.search();
      });

      this.pagedList.statusChange.subscribe((categoryId) => {
        this.isEdit = false;
        const category = this.getCategory(categoryId)
        this.categoryIdSelected = category.Id;
        this.titleConfirm = `Desea ${category ? category.IsActive ? "Desactivar" : "Activar" : ''} la categoria${category ? " " + category.Name : ''}?`
        this._modalService.openConfirm();
      });

      this.pagedList.edit.subscribe((categoryId) => {
        this.isEdit = true;
        this.categorySelected = this.pagedList.Items.find(i => i.Id === categoryId)!;
        this._rSidebarSerive.openSidebar();
      });
    }
    this.init();

  }

  init() {
    this.blockUI.start('Cargando...');
    this._categoryService.getFilteringOptionsCategoryList().subscribe((res: FilteringOptionsCategoryListVM) => {
      if (res.HasErrors || res.HasWarnings) {
        this.blockUI.stop();
        return
      }

      this.statesOptions = res.Status
      this.blockUI.stop();
      this.search();
    })

  }

  parameters(): SearchCategoriesPagedList {
    let parameters: SearchCategoriesPagedList = {
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

  getPagedList(params: SearchCategoriesPagedList) {
    this.blockUI.start('Cargando...');
    this._categoryService
      .getAllCategories(params)
      .subscribe((res: CategoryListVM) => {
        if (res.HasErrors) {
          this.blockUI.stop();
          return;
        }

        this.pagedList.updateData(res.Items, res.TotalItems);

        this.blockUI.stop();
      });
  }

  updateCategories() {
    this.search();
    this._rSidebarSerive.closeSidebar();
  }

  addCategory() {
    this.isEdit = true;
    this.categorySelected = null;
    this._rSidebarSerive.openSidebar();
  }

  getCategory(id: number) {
    return this.pagedList.Items.find(i => i.Id === id)!
  }

  changeStatus() {
    this._modalService.closeConfirm();
    this.blockUI.start('Cargando...');
    this._categoryService.changeStatus(this.categoryIdSelected).subscribe((res: ResponseMessages) => {
      this._alertService.showAlerts(res);
      if (res.HasErrors || res.HasWarnings) {
        this.blockUI.stop();
        return
      }
      this.blockUI.stop();
      this.updateCategories();
    })
  }
}
