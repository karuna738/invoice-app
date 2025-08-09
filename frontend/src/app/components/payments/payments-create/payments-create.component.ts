import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payments-create',
  templateUrl: './payments-create.component.html',
  styleUrls: ['./payments-create.component.scss']
})
export class PaymentsCreateComponent implements OnInit{
  paymentForm!: FormGroup;
  submitted = false;
  invoiceId!: number;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.invoiceId = Number(this.route.snapshot.queryParamMap.get('invoice_id'));

    this.paymentForm = this.fb.group({
      bank_name: ['', Validators.required],
      account_number: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.paymentForm.invalid) return;

    const paymentData = {
      invoice_id: this.invoiceId,
      ...this.paymentForm.value
    };

    this.paymentService.addPaymentMethod(paymentData).subscribe(() => {
      alert('Payment method added successfully!');
      this.router.navigate(['/payments'], { queryParams: { invoice_id: this.invoiceId } });
    });
  }
}
