// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environment/environment';

// export interface PaymentMethod {
//   payment_id?: number;
//   invoice_id: number;
//   bank_name: string;
//   account_number: string;
// }

// @Injectable({ providedIn: 'root' })
// export class PaymentService {
//   private apiUrl = `${environment.apiUrl}/payments`;

//   constructor(private http: HttpClient) {}

//   addPaymentMethod(payment: PaymentMethod): Observable<any> {
//     return this.http.post(this.apiUrl, payment);
//   }

//   getPaymentsByInvoice(): Observable<PaymentMethod[]> {
//     return this.http.get<PaymentMethod[]>(`${this.apiUrl}`);
//   }

//   deletePayments(id: any): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${id}`);
//   }

//   updatePayment(id: number, paymentData: any): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${id}`, paymentData);
//   }
// }

// // Add Payment Method
// // POST /api/payments
// // {
// //   "invoice_id": 1,
// //   "bank_name": "HDFC Bank",
// //   "account_number": "1234567890"
// // }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

export interface PaymentMethod {
  payment_id?: number;
  bank_name: string;
  account_number: string;
}

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/payments`;

  constructor(private http: HttpClient) {}

  // CREATE payment method
  addPaymentMethod(payment: PaymentMethod, userId: number): Observable<any> {
    return this.http.post(this.apiUrl, { ...payment, user_id: userId });
  }

  // GET all payment methods of logged-in user
  getPayments(userId: number): Observable<PaymentMethod[]> {
    return this.http.get<PaymentMethod[]>(`${this.apiUrl}?user_id=${userId}`);
  }

  // DELETE one user's payment method
  deletePayment(id: number, userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}?user_id=${userId}`);
  }

  // UPDATE one user's payment method
  updatePayment(id: number, paymentData: any, userId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { ...paymentData, user_id: userId });
  }
}

// this.paymentService.addPaymentMethod(this.paymentForm.value, this.userId)
// this.paymentService.getPayments(this.userId)
// this.paymentService.updatePayment(paymentId, this.editForm.value, this.userId)
// this.paymentService.deletePayment(paymentId, this.userId)