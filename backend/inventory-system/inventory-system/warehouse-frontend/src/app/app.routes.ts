import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { InventoryComponent } from './inventory/inventory.component';
import { StockComponent } from './stock/stock.component';
import { OrdersComponent } from './orders/orders.component';
import { SupplierComponent } from './supplier/supplier.component';
import { UsersComponent } from './users/users.component';
import { InformationComponent } from './information/information.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'stock', component: StockComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'supplier', component: SupplierComponent },
  { path: 'users', component: UsersComponent },
  { path: 'information', component: InformationComponent },
];