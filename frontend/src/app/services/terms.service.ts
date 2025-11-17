// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environment/environment';

// export interface Terms {
//   term_id?: number;
//   invoice_id: number;
//   terms: string;
// }

// @Injectable({ providedIn: 'root' })
// export class TermsService {
//   private apiUrl = `${environment.apiUrl}/terms`;

//   constructor(private http: HttpClient) {}

//   addTerms(terms: Terms): Observable<any> {
//     return this.http.post(this.apiUrl, terms);
//   }

//   getTermsByInvoice(): Observable<Terms[]> {
//     return this.http.get<Terms[]>(`${this.apiUrl}`);
//   }

//   deleteTerms(id: any): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${id}`);
//   }
//   updateTerms(id: number, terms: any): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${id}`, terms);
//   }
// }

// // Add Terms & Conditions

// // POST /api/terms
// // {
// //   "invoice_id": 1,
// //   "terms": "Payment should be made within 7 days of invoice date."
// // }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

export interface Terms {
  term_id?: number;
  terms: string;
}

@Injectable({ providedIn: 'root' })
export class TermsService {
  private apiUrl = `${environment.apiUrl}/terms`;

  constructor(private http: HttpClient) {}

  // CREATE terms
  addTerms(terms: Terms, userId: number): Observable<any> {
    return this.http.post(this.apiUrl, { ...terms, user_id: userId });
  }

  // GET all terms of logged-in user
  getTerms(userId: number): Observable<Terms[]> {
    return this.http.get<Terms[]>(`${this.apiUrl}?user_id=${userId}`);
  }

  // DELETE user's terms
  deleteTerms(id: number, userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}?user_id=${userId}`);
  }

  // UPDATE user's terms
  updateTerms(id: number, data: Terms, userId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { ...data, user_id: userId });
  }
}
