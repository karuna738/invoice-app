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
  
  billFrom :any = [];
  billTo :any = [];
  paginatedCustomersFrom: any[] = [];
  paginatedCustomersTo: any[] = [];
  page = 1;
  itemsPerPage = 5;
  isSubscribedToEmailsMessage: any
  columns = [
    { key: 'name', label: 'Name' },
    { key: 'company_name', label: 'Company Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    {
      key: 'type',
      label: 'Type',
      formatter: (row: any) => (row.type === 'BILL_FROM' ? 'Bill from' : 'Bill to'),
    },
  ];


  constructor(
    private customerService: CustomerService,
    private rout: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe((res) => {
      this.billFrom = res.filter(val => val.type === "BILL_FROM");
      this.billTo = res.filter(val => val.type === "BILL_TO");
      this.updatePaginatedCustomers();
    });
  }

  updatePaginatedCustomers() {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCustomersFrom = this.billFrom.slice(startIndex, endIndex);
    this.paginatedCustomersTo = this.billTo.slice(startIndex, endIndex);
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
    this.customerService.deleteCustomers(customer.customer_id).subscribe((res) => {
      if(res){
        this.getCustomers();
        this.toastr.success('Data deleted successfully!', 'Success');
      }
    });
  }
}
