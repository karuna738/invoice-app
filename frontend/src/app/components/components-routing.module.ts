import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'invoices',
    loadChildren: () => import('./invoice/invoice.module').then((m) => m.InvoiceModule),
  },
  {
    path: 'customers',
    loadChildren: () => import('./customer/customer.module').then((m) => m.CustomerModule),
  },
  {
    path: 'payments',
    loadChildren: () => import('./payments/payments.module').then((m) => m.PaymentsModule),
  },
  {
    path: 'terms&conditions',
    loadChildren: () =>
      import('./terms-conditions/terms-conditions.module').then((m) => m.TermsConditionsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule {}
