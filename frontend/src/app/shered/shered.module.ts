import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SheredRoutingModule } from './shered-routing.module';
import { DecimalOnlyDirective } from './directives/decimal-only.directive';
import { OnlyNumbersDirective } from './directives/only-numbers.directive';


@NgModule({
  declarations: [
    DecimalOnlyDirective,
    OnlyNumbersDirective
  ],
  imports: [
    CommonModule,
    SheredRoutingModule
  ],
  exports: [
    DecimalOnlyDirective,
    OnlyNumbersDirective
  ]
})
export class SheredModule { }
