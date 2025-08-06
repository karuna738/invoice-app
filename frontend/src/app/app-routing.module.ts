import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { InvoiceCreateComponent } from './components/invoice/invoice-create/invoice-create.component';
// import { InvoiceListComponent } from './components/invoice/invoice-list/invoice-list.component';
// import { InvoiceViewComponent } from './components/invoice/invoice-view/invoice-view.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

const routes: Routes = [
    {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path:'',  loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule)
      }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
