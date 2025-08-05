import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';


export interface Invoice {
  invoice_id?: number;
  invoice_number: string;
  bill_to_id: number;
  bill_from_id: number;
  due_date: string;
  invoice_date: string;
  subtotal: number;
  tax_rate: number;
  total: number;
}

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  private apiUrl = `${environment.apiUrl}/invoices`;

  constructor(private http: HttpClient) {}

  createInvoice(invoice: Invoice): Observable<any> {
    return this.http.post(this.apiUrl, invoice);
  }

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.apiUrl);
  }

getInvoiceItems(id: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/${id}`);
}

}


// Create Invoice
// POST /api/invoices
// {
//   "bill_to_id": 1,
//   "bill_from_id": 2,
//   "due_date": "2025-08-10",
//   "invoice_date": "2025-08-02",
//   "subtotal": 5000,
//   "tax_rate": 18,
//   "total": 5900,
//   "items": [
//     { "description": "Web Development Service", "price": 4000, "quantity": 1, "total": 4000 },
//     { "description": "Domain Purchase", "price": 1000, "quantity": 1, "total": 1000 }
//   ]
// }

