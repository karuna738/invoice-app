import { Component } from '@angular/core';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.scss']
})
export class InvoiceViewComponent {
 invoice = {
  "invoice": {
    "invoice_number": "123456789",
    "invoice_date": "2025-08-02",
    "due_date": "2025-08-02",
    "bill_to": {
      "name": "John Doe",
      "company_name": "Client Company",
      "address": "123 Street",
      "city": "Chennai",
      "state": "Tamil Nadu",
      "zip_code": "600064",
      "email": "john.doe@example.com",
      "phone": "+91 9876543210"
    },
    "bill_from": {
      "name": "Jane Smith",
      "company_name": "Your Company",
      "address": "456 Avenue",
      "city": "Madurai",
      "state": "Tamil Nadu",
      "zip_code": "625001",
      "email": "jane.smith@example.com",
      "phone": "+91 9123456780"
    },
    "items": [
      {
        "description": "Description 1",
        "price": 50.00,
        "quantity": 14,
        "total": 700.00
      },
      {
        "description": "Description 2",
        "price": 56.00,
        "quantity": 15,
        "total": 840.00
      },
      {
        "description": "Description 3",
        "price": 76.00,
        "quantity": 11,
        "total": 836.00
      },
      {
        "description": "Description 4",
        "price": 64.00,
        "quantity": 12,
        "total": 768.00
      },
      {
        "description": "Description 5",
        "price": 55.00,
        "quantity": 13,
        "total": 715.00
      }
    ],
    "summary": {
      "subtotal": 3859.00,
      "tax_rate": 5.00,
      "total": 4075.05,
      "paid": 0.000
    },
    "payment_method": {
      "bank_name": "HDFC Bank",
      "account_number": "1234567890",
      "account_holder": "nameeeee"
    },
    "terms_conditions": "Payment should be made within 15 days of the invoice date."
  }
}

}
