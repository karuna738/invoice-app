import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  customers: any[] = [];
  paginatedCustomers: any[] = [];
  page = 1;
  itemsPerPage = 5;

  constructor(private customerService: CustomerService, private rout: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe((res) => {
      this.customers = res;
      this.updatePaginatedCustomers();
    });
  }

  updatePaginatedCustomers() {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCustomers = this.customers.slice(startIndex, endIndex);
  }

  onPageChanged(p: number) {
    this.page = p;
    this.updatePaginatedCustomers();
  }

  onPageSizeChanged(size: number) {
    this.itemsPerPage = size;
    this.page = 1;
    this.updatePaginatedCustomers();
  }

  addPage() {
    this.rout.navigate(['/customers/create']);
  }
  viewPage(dd: any) {}

  editCustomer(customer: any) {
    this.rout.navigate(['/customers/create'], {
      queryParams: { id: customer.customer_id },
    });
  }

  deleteCustomer(customer: any) {
    this.customerService
      .deleteCustomers(customer.customer_id)
      .subscribe((res) => {
        this.toastr.success('Data deleted successfully!', 'Success');
      });
  }
}
