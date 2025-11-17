import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.scss'],
})
export class PaymentsListComponent implements OnInit {
  payments: any[] = [];
  paginatedPayments: any[] = [];
  page = 1;
  itemsPerPage = 5;
  userId!: number;

  columns = [
    { key: 'bank_name', label: 'Bank Name' },
    { key: 'account_number', label: 'Account Number' },
  ];

  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // 1️⃣ Load user first
    this.authService.getProfile().subscribe(res => {
      this.userId = res.user.id;

      // 2️⃣ Only after userId is ready → load payments
      this.getPayments();
    });
  }

  getPayments() {
    this.paymentService.getPayments(this.userId).subscribe(res => {
      this.payments = res;
      this.updatePaginatedPayments();
    });
  }

  updatePaginatedPayments() {
    const start = (this.page - 1) * this.itemsPerPage;
    this.paginatedPayments = this.payments.slice(start, start + this.itemsPerPage);
  }

  onPageChanged(page: number) {
    this.page = page;
    this.updatePaginatedPayments();
  }

  onPageSizeChanged(size: number) {
    this.itemsPerPage = size;
    this.page = 1;
    this.updatePaginatedPayments();
  }

  editPayment(payment: any) {
    this.router.navigate(['/payments/create'], {
      queryParams: { id: payment.payment_id },
    });
  }

  deletePayment(payment: any) {
    this.paymentService.deletePayment(payment.payment_id, this.userId).subscribe(res => {
      if (res) {
        this.getPayments();
      }
    });
  }
}
