// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environment/environment';

// export interface Customer {
//   customer_id?: number;
//   name: string;
//   company_name?: string;
//   address?: string;
//   city?: string;
//   state?: string;
//   zip_code?: string;
//   email?: string;
//   phone?: string;
//   type: 'BILL_TO' | 'BILL_FROM';
// }

// @Injectable({ providedIn: 'root' })
// export class CustomerService {
//   private apiUrl = `${environment.apiUrl}/customers`;

//   constructor(private http: HttpClient) {}

//   createCustomer(customer: Customer): Observable<any> {
//     return this.http.post(this.apiUrl, customer);
//   }

//   // getCustomers(): Observable<Customer[]> {
//   //   return this.http.get<Customer[]>(this.apiUrl);
//   // }
//   getCustomers(userId: number): Observable<Customer[]> {
//   return this.http.get<Customer[]>(`${this.apiUrl}?user_id=${userId}`);
// }

//   deleteCustomers(id: any): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${id}`);
//   }

//   updateCustomer(id: number, data: any): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${id}`, data);
//   }
// }

// // Create Customer
// // POST /api/customers
// // {
// //   "name": "John Doe",
// //   "company_name": "Tech Solutions",
// //   "address": "123 Main Street",
// //   "city": "Chennai",
// //   "state": "Tamil Nadu",
// //   "zip_code": "600064",
// //   "email": "john@example.com",
// //   "phone": "9876543210",
// //   "type": "BILL_TO"
// // }



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

  // CREATE customer
  createCustomer(customer: Customer, userId: number): Observable<any> {
    return this.http.post(this.apiUrl, { ...customer, user_id: userId });
  }

  // GET all customers of logged-in user
  getCustomers(userId: number): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}?user_id=${userId}`);
  }

  // DELETE only user's customer
  deleteCustomer(id: number, userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}?user_id=${userId}`);
  }

  // UPDATE only user's customer
  updateCustomer(id: number, data: Customer, userId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { ...data, user_id: userId });
  }
}

// this.customerService.createCustomer(this.customerForm.value, this.userId)
// this.customerService.getCustomers(this.userId)
// this.customerService.updateCustomer(this.customerId, this.customerForm.value, this.userId)
// this.customerService.deleteCustomer(customerId, this.userId)