import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentsListComponent } from './payments-list/payments-list.component';
import { PaymentsCreateComponent } from './payments-create/payments-create.component';

const routes: Routes = [
  {path: '', component: PaymentsListComponent},
  {path: 'create', component: PaymentsCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
