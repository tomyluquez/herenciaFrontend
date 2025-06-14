import { Routes } from '@angular/router';
import { orderRoutesModel } from '../../../Routes.model';

export default [
    {
        path: orderRoutesModel.OrderStatus,
        loadComponent: () =>
            import('../../Order/Pages/order-status/order-status.component').then(
                (m) => m.OrderStatusComponent
            ),
    }
] as Routes;
