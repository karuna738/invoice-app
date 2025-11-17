import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InvoiceService } from 'src/app/services/invoice.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
})
export class InvoiceListComponent implements OnInit {
  invoices: any[] = [];
  paginatedInvoices: any[] = [];
  page = 1;
  itemsPerPage = 5;
  userId!: number;

  columns = [
    { key: 'invoice_number', label: 'Invoice Number' },
    { key: 'bill_from_name', label: 'Bill From' },
    { key: 'bill_to_name', label: 'Bill To' },
    { key: 'formattedInvoiceDate', label: 'Invoice Date' },
    { key: 'formattedDueDate', label: 'Due Date' },
    { key: 'payment_status', label: 'Status' },
    { key: 'formattedTotal', label: 'Total' },
  ];

  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    private toastr: ToastrService,
    private currencyPipe: CurrencyPipe,
    private datePipe: DatePipe,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Get user ID then load invoices
    this.authService.getProfile().subscribe(res => {
      this.userId = res.user.id;
      this.getInvoiceData();
    });
  }

  /***********************************************************
   * GET INVOICES
   ***********************************************************/
  getInvoiceData() {
    this.invoiceService.getInvoices(this.userId).subscribe((data) => {
      // Format records for UI
      this.invoices = data.map((inv) => ({
        ...inv,
        formattedTotal: this.currencyPipe.transform(inv.total, 'INR', 'symbol', '1.2-2'),
        formattedInvoiceDate: this.datePipe.transform(inv.invoice_date, 'MMM dd, yyyy'),
        formattedDueDate: this.datePipe.transform(inv.due_date, 'MMM dd, yyyy'),
      }));

      this.updatePaginatedInvoices();
    });
  }

  /***********************************************************
   * PAGINATION
   ***********************************************************/
  updatePaginatedInvoices() {
    const start = (this.page - 1) * this.itemsPerPage;
    this.paginatedInvoices = this.invoices.slice(start, start + this.itemsPerPage);
  }

  onPageChanged(page: number) {
    this.page = page;
    this.updatePaginatedInvoices();
  }

  onPageSizeChanged(size: number) {
    this.itemsPerPage = size;
    this.page = 1;
    this.updatePaginatedInvoices();
  }

  /***********************************************************
   * NAVIGATION
   ***********************************************************/
  addPage() {
    this.router.navigate(['/invoices/create']);
  }

  editPage(invoice: any) {
    this.router.navigate(['/invoices/create'], { queryParams: { id: invoice.invoice_id } });
  }

  viewPage(invoice: any) {
    this.router.navigate(['/invoices/view'], { queryParams: { id: invoice.invoice_id } });
  }

  /***********************************************************
   * DELETE INVOICE
   ***********************************************************/
  deleteInvoice(invoice: any) {
    if (!confirm('Are you sure you want to delete this invoice?')) return;

    this.invoiceService.deleteInvoice(invoice.invoice_id, this.userId).subscribe(() => {
      this.toastr.success('Invoice deleted successfully!', 'Success');
      this.getInvoiceData();
    });
  }
}


// // <option value="Draft">Draft</option>
// //   <option value="Sent">Sent</option>
// //   <option value="Paid">Paid</option>
// //   <option value="Overdue">Overdue</option>