import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

export interface PaymentMethod {
  payment_id?: number;
  invoice_id: number;
  bank_name: string;
  account_number: string;
}

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/payments`;

  constructor(private http: HttpClient) {}

  addPaymentMethod(payment: PaymentMethod): Observable<any> {
    return this.http.post(this.apiUrl, payment);
  }

  getPaymentsByInvoice(invoiceId: number): Observable<PaymentMethod[]> {
    return this.http.get<PaymentMethod[]>(`${this.apiUrl}/${invoiceId}`);
  }
}

// Add Payment Method
// POST /api/payments
// {
//   "invoice_id": 1,
//   "bank_name": "HDFC Bank",
//   "account_number": "1234567890"
// }
