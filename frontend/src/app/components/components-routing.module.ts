import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from '../core/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'invoices',
    loadChildren: () => import('./invoice/invoice.module').then((m) => m.InvoiceModule),
    canActivate: [authGuard],
  },
  {
    path: 'customers',
    loadChildren: () => import('./customer/customer.module').then((m) => m.CustomerModule),
    canActivate: [authGuard],
  },
  {
    path: 'payments',
    loadChildren: () => import('./payments/payments.module').then((m) => m.PaymentsModule),
    canActivate: [authGuard],
  },
  {
    path: 'terms&conditions',
    loadChildren: () =>
      import('./terms-conditions/terms-conditions.module').then((m) => m.TermsConditionsModule),
    canActivate: [authGuard],
  },
  {
    path: 'users',
    loadChildren: () => 
      import('./users/users.module').then((m) => m.UsersModule),
    canActivate: [authGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule {}
