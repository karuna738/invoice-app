import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss']
})
export class CustomerCreateComponent {
 customerForm!: FormGroup;
  submitted = false;
  customerTypes = ['BILL_TO', 'BILL_FROM'];

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      company_name: [''],
      address: [''],
      city: [''],
      state: [''],
      zip_code: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.customerForm.invalid) {
      return;
    }

    this.customerService.createCustomer(this.customerForm.value).subscribe({
      next: (res) => {
        console.log('Customer created:', res);
        alert('Customer created successfully');
        this.router.navigate(['/customers']);
      },
      error: (err) => console.error(err)
    });
  }
}
