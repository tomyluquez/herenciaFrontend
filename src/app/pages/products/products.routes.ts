import { Routes } from '@angular/router';
import { productsRoutesModel } from '../../models/Routes.model';

export default [
    {
        path: "",
        loadComponent: () =>
            import('../products/products/products.component').then(
                (m) => m.ProductsComponent
            ),
    },
    {
        path: productsRoutesModel.Product,
        loadComponent: () =>
            import('../products/ind-product/ind-product.component').then(
                (m) => m.IndProductComponent
            ),
    },
    {
        path: productsRoutesModel.FormProduct,
        loadComponent: () => import('../products/form-product/form-product.component').then((m) => m.FormProductComponent)
    }
] as Routes;
