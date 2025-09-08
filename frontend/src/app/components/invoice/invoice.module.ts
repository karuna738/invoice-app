import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceCreateComponent } from './invoice-create/invoice-create.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceViewComponent } from './invoice-view/invoice-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SheredModule } from 'src/app/shered/shered.module';

@NgModule({
  declarations: [InvoiceListComponent, InvoiceCreateComponent, InvoiceViewComponent],
  imports: [CommonModule, InvoiceRoutingModule, FormsModule, ReactiveFormsModule, SheredModule],
})
export class InvoiceModule {}
