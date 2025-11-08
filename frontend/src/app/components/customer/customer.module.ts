import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SheredModule } from 'src/app/shered/shered.module';
import {MatTabsModule} from '@angular/material/tabs';
@NgModule({
  declarations: [CustomerListComponent, CustomerCreateComponent],
  imports: [CommonModule, CustomerRoutingModule, FormsModule, ReactiveFormsModule, SheredModule, MatTabsModule],
})
export class CustomerModule {}
