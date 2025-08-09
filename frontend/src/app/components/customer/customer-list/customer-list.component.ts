import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
 customers: any[] = [];

  constructor(private customerService: CustomerService, private rout: Router) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe((res) => {
      this.customers = res;
    });
  }

  addPage() {
    this.rout.navigate(['/customers/create']);
  }
  viewPage(dd:any){}
}
