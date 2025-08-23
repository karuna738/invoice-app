import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';


export interface Customer {
  customer_id?: number;
  name: string;
  company_name?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  email?: string;
  phone?: string;
  type: 'BILL_TO' | 'BILL_FROM';
}

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private apiUrl = `${environment.apiUrl}/customers`;

  constructor(private http: HttpClient) {}

  createCustomer(customer: Customer): Observable<any> {
    return this.http.post(this.apiUrl, customer);
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  deleteCustomers(id:any): Observable<any> {
     return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateCustomer(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
}

// Create Customer
// POST /api/customers
// {
//   "name": "John Doe",
//   "company_name": "Tech Solutions",
//   "address": "123 Main Street",
//   "city": "Chennai",
//   "state": "Tamil Nadu",
//   "zip_code": "600064",
//   "email": "john@example.com",
//   "phone": "9876543210",
//   "type": "BILL_TO"
// }
