import { Routes } from '@angular/router';
import { routesModel } from './Routes.model';

export const routes: Routes = [
  {
    path: '',
    redirectTo: routesModel.Home,
    pathMatch: 'full',
  },
  {
    path: routesModel.Home,
    loadComponent: () =>
      import('./Modules/Other/Pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: routesModel.Products,
    loadChildren: () => import('../app/Modules/Product/Routes/products.routes')
  },
  {
    path: routesModel.Stock,
    loadChildren: () => import('./Modules/Variant/Routes/stock.routes')
  },

  {
    path: routesModel.Contact,
    loadComponent: () =>
      import('./Modules/Other/Pages/contact/contact.component').then(
        (m) => m.ContactComponent
      ),
  },
  {
    path: routesModel.Login,
    loadComponent: () =>
      import('./Modules/Auth/Pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: routesModel.Register,
    loadComponent: () =>
      import('./Modules/Auth/Pages/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: routesModel.Cart,
    loadComponent: () =>
      import('./Modules/Cart/Pages/Cart/cart.component').then((m) => m.CartComponent),
  },
  {
    path: routesModel.ControlPanel,
    loadComponent: () =>
      import('./Modules/Other/Pages/control-panel/control-panel.component').then(
        (m) => m.ControlPanelComponent
      ),
  },
];
