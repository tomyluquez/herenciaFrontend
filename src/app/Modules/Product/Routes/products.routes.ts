import { Routes } from '@angular/router';
import { productsRoutesModel } from '../../../Routes.model';

export default [
    {
        path: "",
        loadComponent: () =>
            import('../Pages/products/products.component').then(
                (m) => m.ProductsComponent
            ),
    },
    {
        path: productsRoutesModel.Product,
        loadComponent: () =>
            import('../Pages/ind-product/ind-product.component').then(
                (m) => m.IndProductComponent
            ),
    },
    {
        path: productsRoutesModel.FormProduct,
        loadComponent: () => import('../Pages/form-product/form-product.component').then((m) => m.FormProductComponent)
    }
] as Routes;
