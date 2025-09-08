import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss'],
})
export class CustomerCreateComponent implements OnInit {
  customerForm!: FormGroup;
  submitted = false;
  customerTypes = ['BILL_FROM', 'BILL_TO'];
  customerId: any;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.route.queryParams.subscribe((res) => {
      if (res) {
        this.customerId = +res['id'];
        this.loadCustomer();
      }
    });
  }
  ngOnInit(): void {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      company_name: [''],
      address: [''],
      city: [''],
      state: [''],
      zip_code: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  loadCustomer(): void {
    this.customerService.getCustomers().subscribe((customers) => {
      const customer = customers.find((c: any) => c.customer_id === this.customerId);
      if (customer) {
        this.customerForm.patchValue(customer);
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.customerForm.invalid) return;

    if (this.customerId) {
      // update
      this.customerService
        .updateCustomer(this.customerId, this.customerForm.value)
        .subscribe(() => {
          this.toastr.success(`'Customer updated successfully'!`, 'Success');
          this.router.navigate(['/customers']);
        });
    } else {
      // create
      this.customerService.createCustomer(this.customerForm.value).subscribe(() => {
        this.toastr.success(`'Customer created successfully'!`, 'Success');
        this.router.navigate(['/customers']);
      });
    }
  }
}
