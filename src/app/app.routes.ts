import { Routes } from '@angular/router';
import { routesModel } from './models/Routes.model';

export const routes: Routes = [
  {
    path: '',
    redirectTo: routesModel.Home,
    pathMatch: 'full',
  },
  {
    path: routesModel.Home,
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: routesModel.Products,
    loadComponent: () =>
      import('./pages/products/products.component').then(
        (m) => m.ProductsComponent
      ),
  },
  {
    path: routesModel.Product,
    loadComponent: () =>
      import('./pages/products/ind-product/ind-product.component').then(
        (m) => m.IndProductComponent
      ),
  },
  {
    path: routesModel.Contact,
    loadComponent: () =>
      import('./pages/contact/contact.component').then(
        (m) => m.ContactComponent
      ),
  },
  {
    path: routesModel.Login,
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: routesModel.Register,
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: routesModel.Cart,
    loadComponent: () =>
      import('./pages/cart/cart.component').then((m) => m.CartComponent),
  },
  {
    path: routesModel.ControlPanel,
    loadComponent: () =>
      import('./pages/control-panel/control-panel.component').then(
        (m) => m.ControlPanelComponent
      ),
  },
];
