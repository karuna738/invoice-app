import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private tostr: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    console.log('checking');
    
    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // ⚠️ Handle different error types
        if (error.status === 401) {
          this.tostr.error('Session expired. Please log in again.', 'Unauthorized');
          localStorage.removeItem('token');
          this.router.navigate(['/auth']);
        } else if (error.status === 403) {
          this.tostr.warning('Access denied. You are not authorized.', 'Forbidden');
        } else if (error.status === 404) {
          this.tostr.warning('Requested resource not found.', 'Not Found');
        } else if (error.status === 500) {
          this.tostr.error('Internal Server Error. Please try later.', 'Server Error');
        } else {
          // Default error message
          this.tostr.error(error.error.message || 'Something went wrong', 'Error');
        }

        // 🚫 Rethrow error so your components can still catch it if needed
        return throwError(() => error);
      })
    );
  }
}
