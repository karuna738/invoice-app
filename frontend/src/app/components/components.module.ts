import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SheredModule } from '../shered/shered.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, ComponentsRoutingModule, SheredModule],
  providers: [CurrencyPipe, DatePipe],
})
export class ComponentsModule {}
