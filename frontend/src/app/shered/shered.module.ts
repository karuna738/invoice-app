import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SheredRoutingModule } from './shered-routing.module';
import { DecimalOnlyDirective } from './directives/decimal-only.directive';
import { OnlyNumbersDirective } from './directives/only-numbers.directive';
import { PaginationComponent } from './common-components/pagination/pagination.component';


@NgModule({
  declarations: [
    DecimalOnlyDirective,
    OnlyNumbersDirective,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    SheredRoutingModule
  ],
  exports: [
    DecimalOnlyDirective,
    OnlyNumbersDirective,
    PaginationComponent
  ]
})
export class SheredModule { }
