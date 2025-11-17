import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payments-create',
  templateUrl: './payments-create.component.html',
  styleUrls: ['./payments-create.component.scss'],
})
export class PaymentsCreateComponent implements OnInit {
  paymentForm!: FormGroup;
  submitted = false;
  paymentId: number | null = null;
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // 1️⃣ Load logged-in user
    this.authService.getProfile().subscribe(res => {
      this.userId = res.user.id;

      // 2️⃣ Read queryParams AFTER userId is available
      this.route.queryParams.subscribe(params => {
        this.paymentId = params['id'] ? +params['id'] : null;

        if (this.paymentId) {
          this.getPaymentData();
        }
      });
    });

    // 3️⃣ Build the form
    this.paymentForm = this.fb.group({
      bank_name: ['', Validators.required],
      account_number: ['', Validators.required],
    });
  }

  getPaymentData() {
    this.paymentService.getPayments(this.userId).subscribe(res => {
      const payment = res.find((p: any) => p.payment_id === this.paymentId);
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
      this.paymentService.updatePayment(this.paymentId, data, this.userId).subscribe({
        next: () => this.router.navigate(['/payments']),
        error: err => console.error('Update failed', err),
      });

    } else {
      // Create
      this.paymentService.addPaymentMethod(data, this.userId).subscribe({
        next: () => this.router.navigate(['/payments']),
        error: err => console.error('Create failed', err),
      });
    }
  }
}
