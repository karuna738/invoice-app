import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payments-create',
  templateUrl: './payments-create.component.html',
  styleUrls: ['./payments-create.component.scss'],
})
export class PaymentsCreateComponent implements OnInit {
  paymentForm!: FormGroup;
  submitted = false;
  paymentId!: number;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe((res) => {
      this.paymentId = +res['id'];
      if (this.paymentId) {
        this.getPaymentData();
      }
    });
  }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      bank_name: ['', Validators.required],
      account_number: ['', Validators.required],
    });
  }

  getPaymentData() {
    this.paymentService.getPaymentsByInvoice().subscribe((res) => {
      const payment: any = res.find((pay) => pay.payment_id === this.paymentId);
      if (payment) {
        this.paymentForm.patchValue(payment);
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.paymentForm.invalid) return;

    const data = this.paymentForm.value;

    if (this.paymentId) {
      // Update
      this.paymentService.updatePayment(this.paymentId, data).subscribe({
        next: () => this.router.navigate(['/payments']),
        error: (err) => console.error('Update failed', err),
      });
    } else {
      // Create
      this.paymentService.addPaymentMethod(data).subscribe({
        next: () => this.router.navigate(['/payments']),
        error: (err) => console.error('Create failed', err),
      });
    }
  }
}
