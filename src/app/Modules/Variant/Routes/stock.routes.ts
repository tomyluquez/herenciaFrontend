import { Routes } from '@angular/router';
import { stockRoutesModel } from '../../../Routes.model';

export default [
    {
        path: stockRoutesModel.FormStock,
        loadComponent: () => import('../Pages/stock-form/stock-form.component').then((m) => m.StockFormComponent)
    }
] as Routes;
