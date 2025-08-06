import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermsListComponent } from './terms-list/terms-list.component';
import { TermsCreateComponent } from './terms-create/terms-create.component';

const routes: Routes = [
  {path: '', component: TermsListComponent},
  {path: 'create', component: TermsCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermsConditionsRoutingModule { }
