import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceCreateComponent } from './invoice/invoice-create/invoice-create.component';
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { InvoiceViewComponent } from './invoice/invoice-view/invoice-view.component';

const routes: Routes = [
    { path: '', redirectTo: '/invoices', pathMatch: 'full' },
    { path: 'invoices', component: InvoiceListComponent },
    { path: 'invoices/create', component: InvoiceCreateComponent },
    { path: 'invoices/view', component: InvoiceViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
