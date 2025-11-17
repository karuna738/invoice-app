import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  billFrom: any[] = [];
  billTo: any[] = [];
  paginatedCustomersFrom: any[] = [];
  paginatedCustomersTo: any[] = [];

  pageFrom = 1;
  pageTo = 1;
  itemsPerPageFrom = 5;
  itemsPerPageTo = 5;

  activeTabIndex = 0;

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
  userId: any;

  constructor(
    private customerService: CustomerService,
    private rout: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
  this.authService.getProfile().subscribe({
    next: (res) => {
      this.userId = res.user.id;
      this.getCustomers();
    },
    error: (err) => {
      console.error('Error fetching profile:', err);
    },
  });
}

getCustomers(): void {
  this.customerService.getCustomers(this.userId).subscribe({
    next: (res) => {
      this.billFrom = res.filter(val => val.type === 'BILL_FROM');
      this.billTo = res.filter(val => val.type === 'BILL_TO');
      this.updatePaginatedCustomers();
    },
    error: (err) => {
      console.error('Error fetching customers:', err);
    },
  });
}


  onTabChange(index: number) {
    this.activeTabIndex = index;
  }

  updatePaginatedCustomers() {
    const startFrom = (this.pageFrom - 1) * this.itemsPerPageFrom;
    const endFrom = startFrom + this.itemsPerPageFrom;
    this.paginatedCustomersFrom = this.billFrom.slice(startFrom, endFrom);

    const startTo = (this.pageTo - 1) * this.itemsPerPageTo;
    const endTo = startTo + this.itemsPerPageTo;
    this.paginatedCustomersTo = this.billTo.slice(startTo, endTo);
  }

  onPageChanged(p: number) {
    if (this.activeTabIndex === 0) {
      this.pageFrom = p;
    } else {
      this.pageTo = p;
    }
    this.updatePaginatedCustomers();
  }

  onPageSizeChanged(size: number) {
    if (this.activeTabIndex === 0) {
      this.itemsPerPageFrom = size;
      this.pageFrom = 1;
    } else {
      this.itemsPerPageTo = size;
      this.pageTo = 1;
    }
    this.updatePaginatedCustomers();
  }

  addPage() {
    this.rout.navigate(['/customers/create']);
  }

  editCustomer(customer: any) {
    this.rout.navigate(['/customers/create'], {
      queryParams: { id: customer.customer_id },
    });
  }

  deleteCustomer(customer: any) {
    this.customerService.deleteCustomer(customer.customer_id, this.userId).subscribe((res) => {
      if (res) {
        this.getCustomers();
        this.toastr.success('Data deleted successfully!', 'Success');
      }
    });
  }
}
