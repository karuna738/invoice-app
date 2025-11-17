import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
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
  userId: any;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initForm();

    // Load profile first
    this.authService.getProfile().subscribe((res) => {
      this.userId = res.user.id;
      this.getQuery();
    });
  }

  getQuery() {
    this.route.queryParams.subscribe((res) => {
      if (res['id']) {
        this.customerId = +res['id'];
        this.loadCustomer();
      }
    });
  }

  initForm() {
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
    this.customerService.getCustomers(this.userId).subscribe((customers) => {
      const customer = customers.find((c: any) => c.customer_id === this.customerId);
      if (customer) {
        this.customerForm.patchValue({
          name: customer.name,
          company_name: customer.company_name,
          address: customer.address,
          city: customer.city,
          state: customer.state,
          zip_code: customer.zip_code,
          email: customer.email,
          phone: customer.phone,
          type: customer.type,
        });
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.customerForm.invalid) return;

    let params = {
      ...this.customerForm.value,
      user_id: this.userId
    };

    if (this.customerId) {
      this.customerService.updateCustomer(this.customerId, this.customerForm.value, this.userId).subscribe(() => {
        this.toastr.success('Customer updated successfully!', 'Success');
        this.router.navigate(['/customers']);
      });
    } else {
           this.customerService.createCustomer(this.customerForm.value, this.userId).subscribe(() => {
        this.toastr.success('Customer created successfully!', 'Success');
        this.router.navigate(['/customers']);
      });
    }
  }
}
