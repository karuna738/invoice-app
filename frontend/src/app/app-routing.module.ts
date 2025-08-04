import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceCreateComponent } from './components/invoice/invoice-create/invoice-create.component';
import { InvoiceListComponent } from './components/invoice/invoice-list/invoice-list.component';
import { InvoiceViewComponent } from './components/invoice/invoice-view/invoice-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/invoices', pathMatch: 'full' },
  { path: 'invoices', component: InvoiceListComponent },
  { path: 'invoices/create', component: InvoiceCreateComponent },
  { path: 'invoices/view', component: InvoiceViewComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
