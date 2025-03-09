import { Subject } from "rxjs";
import { HeadersTable, TableActions } from "../../Table/Interface/Table-actions.interface";
import { HeaderTypeEnum } from "../../Form/Enums/headers-form-type-enum";
import { IProductPagedList } from "../Interface/Products.interfaces";
import { Table } from "../../Table/Models/Table.model";
import { ProductNavigationService } from "../Services/Product-table.service";

export class ProductListTable extends Table<IProductPagedList> {
    public statusChange: Subject<number> = new Subject<number>();


    constructor(items: IProductPagedList[], totalItems: number, private _productNavigationService: ProductNavigationService) {
        const headers: HeadersTable[] = [
            {
                Name: "Image",
                Value: "Image",
                Type: HeaderTypeEnum.Image
            },
            {
                Name: "Name",
                Value: "Nombre",
                Type: HeaderTypeEnum.Text
            },
            {
                Name: "Price",
                Value: "Precio",
                Type: HeaderTypeEnum.Price
            },
            {
                Name: "CategoryName",
                Value: "Categoria",
                Type: HeaderTypeEnum.Text
            },
            {
                Name: "IsActive",
                Value: "Estado",
                Type: HeaderTypeEnum.Status
            }
        ];

        const actions: TableActions[] = [{
            Icon: "fa-solid fa-pen-to-square",
            Handler: (productId: number) => this.editProduct(productId)
        },
        {
            Icon: "fa-solid fa-arrows-rotate",
            Handler: (productId: number) => this.changeStatus(productId)
        }

        ]
        super(headers, items, actions, totalItems);
    }

    editProduct(productId: number) {
        this._productNavigationService.toProductForm(productId);
    }

    changeStatus(productId: number) {
        this.statusChange.next(productId);
    }

}