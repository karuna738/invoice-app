// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environment/environment';

// export interface Invoice {
//   invoice_id?: number;
//   invoice_number: string;
//   bill_to_id: number;
//   bill_from_id: number;
//   due_date: string;
//   invoice_date: string;
//   subtotal: number;
//   tax_rate: number;
//   total: number;
// }

// @Injectable({ providedIn: 'root' })
// export class InvoiceService {
//   private apiUrl = `${environment.apiUrl}/invoices`;

//   constructor(private http: HttpClient) {}

//   createInvoice(invoice: Invoice): Observable<any> {
//     return this.http.post(this.apiUrl, invoice);
//   }

//   getInvoices(): Observable<Invoice[]> {
//     return this.http.get<Invoice[]>(this.apiUrl);
//   }

//   getInvoiceItems(id: number): Observable<any> {
//     return this.http.get(`${this.apiUrl}/${id}`);
//   }

//   deleteInvoiceItem(id: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${id}`);
//   }

//   updateInvoice(id: number, invoiceData: any): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${id}`, invoiceData);
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

export interface Invoice {
  invoice_id?: number;
  invoice_number?: string;
  bill_to_id: number;
  bill_from_id: number;
  due_date: string;
  invoice_date: string;
  subtotal: number;
  tax_rate: number;
  total: number;
  payment_id?: number;
  term_id?: number;
}

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  private apiUrl = `${environment.apiUrl}/invoices`;

  constructor(private http: HttpClient) {}

  // CREATE invoice
  createInvoice(invoice: Invoice, userId: number): Observable<any> {
    return this.http.post(this.apiUrl, { ...invoice, user_id: userId });
  }

  // GET all invoices of user
  getInvoices(userId: number): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.apiUrl}?user_id=${userId}`);
  }

  // GET invoice + items (only user's invoice)
  getInvoiceItems(id: number, userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}?user_id=${userId}`);
  }

  // DELETE invoice (only user's invoice)
  deleteInvoice(id: number, userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}?user_id=${userId}`);
  }

  // UPDATE invoice (only user's invoice)
  updateInvoice(id: number, data: any, userId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { ...data, user_id: userId });
  }
}

// this.invoiceService.createInvoice(this.form.value, this.userId)
//  this.invoiceService.getInvoices(this.userId)
// this.invoiceService.getInvoiceItems(id, this.userId)
// this.invoiceService.updateInvoice(this.invoiceId, this.form.value, this.userId)
// this.invoiceService.deleteInvoice(id, this.userId)