import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.scss']
})
export class PaymentsListComponent implements OnInit{
  invoiceId!: number;
  payments: any[] = [];

  constructor(private paymentService: PaymentService, private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.getPayments();
  }

  getPayments() {
    this.paymentService.getPaymentsByInvoice().subscribe((res) => {
      this.payments = res;
    });
  }

  editPayment(payment: any) {
  console.log("Edit payment:", payment);
  // Navigate to edit form or open modal
}

deletePayment(payment: any) {
  console.log("Delete payment:", payment);
  // Add delete confirmation and logic here
}

}
