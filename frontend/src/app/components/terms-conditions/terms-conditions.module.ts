import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermsConditionsRoutingModule } from './terms-conditions-routing.module';
import { TermsListComponent } from './terms-list/terms-list.component';
import { TermsCreateComponent } from './terms-create/terms-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SheredModule } from 'src/app/shered/shered.module';

@NgModule({
  declarations: [TermsListComponent, TermsCreateComponent],
  imports: [
    CommonModule,
    TermsConditionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SheredModule,
  ],
})
export class TermsConditionsModule {}
