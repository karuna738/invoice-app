import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  columns = [
    { key: 'bank_name', label: 'Bank Name' },
    { key: 'account_number', label: 'Account Number' },
  ];

  constructor(
    private paymentService: PaymentService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getPayments();
  }

  getPayments() {
    this.paymentService.getPaymentsByInvoice().subscribe((res) => {
      this.payments = res;
      this.updatePaginatedPayments();
    });
  }

  updatePaginatedPayments() {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPayments = this.payments.slice(startIndex, endIndex);
  }

  onPageChanged(p: number) {
    this.page = p;
    this.updatePaginatedPayments();
  }

  onPageSizeChanged(size: number) {
    this.itemsPerPage = size;
    this.page = 1;
    this.updatePaginatedPayments();
  }

  editPayment(payment: any) {
    this.route.navigate(['/payments/create'], {
      queryParams: { id: payment.payment_id },
    });
  }

  deletePayment(payment: any) {
    this.paymentService.deletePayments(payment.payment_id).subscribe((res) => {
      if (res) {
        this.getPayments();
      }
    });
  }
}
