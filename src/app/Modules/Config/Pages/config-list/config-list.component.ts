import { Component } from '@angular/core';
import { ConfigFormComponent } from '../config-form/config-form.component';
import { RSidebarComponent } from '../../../../shared/components/rsidebar/rsidebar.component';
import { BlockUI, BlockUIModule, NgBlockUI } from 'ng-block-ui';
import { GeneralTableComponent } from '../../../Table/Pages/general-table/general-table.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { ConfigkListTable } from '../../Models/Config-list-table.model';
import { PaginationEnum } from '../../../Other/Enums/pagination-enum';
import { ActivationStatusEnum } from '../../../Other/Enums/activation-status-enum';
import { NameAndId } from '../../../Other/Interface/NameValue.interface';
import { IConfig, SearchConfigList } from '../../Interfaces/Config-list.interface';
import { ConfigService } from '../../Services/config.service';
import { RSidebarService } from '../../../Other/Services/rsidebar.service';
import { ConfigVM } from '../../Models/Config-list.model';

@Component({
  selector: 'app-config-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule, FormsModule, GeneralTableComponent, BlockUIModule, RSidebarComponent, ConfigFormComponent],
  templateUrl: './config-list.component.html',
  styleUrl: './config-list.component.css'
})
export class ConfigListComponent {
  @BlockUI('config-list') blockUI!: NgBlockUI
  pagedList!: ConfigkListTable;


  page = PaginationEnum.Page;
  limit = PaginationEnum.Limit;

  defaultStatus = ActivationStatusEnum.Active;

  categories!: NameAndId[]
  sizes!: NameAndId[]
  statesOptions!: NameAndId[]

  isEdit = false
  configSelected!: IConfig;

  constructor(private _configService: ConfigService, private _rSidebarSerive: RSidebarService) {
  }

  ngOnInit(): void {
    this.pagedList = new ConfigkListTable([], 0);
    if (this.pagedList) {
      this.pagedList.pageChange.subscribe((newPage) => {
        this.page = newPage;
        this.search();
      });

      this.pagedList.change.subscribe((configId) => {
        this.addConfig(configId)
      });
    }
    this.init();

  }

  init() {
    this.blockUI.start();
    this.search();

  }

  parameters(): SearchConfigList {
    let parameters: SearchConfigList = {
      Pagination: { Page: this.page, Limit: this.limit },
    }

    return parameters;
  }

  search() {
    let params = this.parameters();
    this.getPagedList(params)
  }

  getPagedList(params: SearchConfigList) {
    this.blockUI.start();
    this._configService
      .getConfig(params)
      .subscribe((res: ConfigVM) => {
        console.log(res)
        if (res.HasErrors) {
          this.blockUI.stop();
          return;
        }

        this.pagedList.updateData(res.Items, res.TotalItems);

        this.blockUI.stop();
      });
  }

  updateStock() {
    this.search();
    this.isEdit = false;
    this._rSidebarSerive.closeSidebar();
  }

  addConfig(configId = 0) {
    if (configId) {
      this.configSelected = this.pagedList.Items.find(i => i.Id === configId)!;
    }
    this.isEdit = true;
    this._rSidebarSerive.openSidebar();
  }
}
