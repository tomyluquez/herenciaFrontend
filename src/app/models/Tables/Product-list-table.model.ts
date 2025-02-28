import { Subject } from "rxjs";
import { NameAndValue } from "../../interfaces/NameValue.interface";
import { IProductPagedList, SearchProductPagedList } from "../../interfaces/Products.interfaces";
import { TableActions } from "../../interfaces/Tables/Table-actions.interface";
import { ProductNavigationService } from "../../services/Tables/Product-table.service";
import { Table } from "./Table.model";

export class ProductListTable extends Table<IProductPagedList> {
    public statusChange: Subject<number> = new Subject<number>();


    constructor(items: IProductPagedList[], totalItems: number, private _productNavigationService: ProductNavigationService) {
        const headers: NameAndValue[] = [
            {
                Name: "Image",
                Value: "Image"
            },
            {
                Name: "Name",
                Value: "Nombre"
            },
            {
                Name: "Price",
                Value: "Precio"
            },
            {
                Name: "CategoryName",
                Value: "Categoria"
            },
            {
                Name: "IsActive",
                Value: "Estado"
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