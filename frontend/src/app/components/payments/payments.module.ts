import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsListComponent } from './payments-list/payments-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentsCreateComponent } from './payments-create/payments-create.component';
import { SheredModule } from 'src/app/shered/shered.module';


@NgModule({
  declarations: [
    PaymentsListComponent,
    PaymentsCreateComponent
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SheredModule
  ]
})
export class PaymentsModule { }
