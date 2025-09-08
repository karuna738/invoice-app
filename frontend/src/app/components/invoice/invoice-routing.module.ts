import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceCreateComponent } from './invoice-create/invoice-create.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceViewComponent } from './invoice-view/invoice-view.component';

const routes: Routes = [
  { path: '', component: InvoiceListComponent },
  { path: 'create', component: InvoiceCreateComponent },
  { path: 'view', component: InvoiceViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceRoutingModule {}
