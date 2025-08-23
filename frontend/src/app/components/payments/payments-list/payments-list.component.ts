import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.scss']
})
export class PaymentsListComponent implements OnInit{
  invoiceId!: number;
  payments: any[] = [];

  constructor(private paymentService: PaymentService, private rout: ActivatedRoute, private route: Router) {}

  ngOnInit(): void {
      this.getPayments();
  }

  getPayments() {
    this.paymentService.getPaymentsByInvoice().subscribe((res) => {
      this.payments = res;
    });
  }

  editPayment(payment: any) {
    this.route.navigate(['/payments/create'],{ queryParams: {'id': payment.payment_id}});
}

deletePayment(payment: any) {
  this.paymentService.deletePayments(payment.payment_id).subscribe(res => {
    if(res){
      this.getPayments();
    }
  })
}

}
