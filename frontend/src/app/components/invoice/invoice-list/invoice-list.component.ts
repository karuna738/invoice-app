import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InvoiceService } from 'src/app/services/invoice.service';

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
  columns = [
    { key: 'invoice_number', label: 'Invoice Number' },
    { key: 'bill_from_name', label: 'Bill From' },
    { key: 'bill_to_name', label: 'Bill To' },
    { key: 'total', label: 'Total' },
  ];
  constructor(
    private invoiceService: InvoiceService,
    private rout: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getInvoiceData();
  }

  getInvoiceData() {
    this.invoiceService.getInvoices().subscribe((data) => {
      this.invoices = data;
      this.updatePaginatedInvoices();
    });
  }

  updatePaginatedInvoices() {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedInvoices = this.invoices.slice(startIndex, endIndex);
  }

  onPageChanged(p: number) {
    this.page = p;
    this.updatePaginatedInvoices();
  }

  onPageSizeChanged(size: number) {
    this.itemsPerPage = size;
    this.page = 1;
    this.updatePaginatedInvoices();
  }

  addPage() {
    this.rout.navigate(['/invoices/create']);
  }

  viewPage(item: any) {
    this.rout.navigate(['/invoices/view'], {
      queryParams: { id: item.invoice_id },
    });
  }

  deleteInvoice(Item: any) {
    this.invoiceService.deleteInvoiceItem(Item.invoice_id).subscribe((res) => {
      this.getInvoiceData();
      this.toastr.success('Data deleted successfully!', 'Success');
    });
  }

  editPage(invoice: any) {
    this.rout.navigate(['/invoices/create'], {
      queryParams: { id: invoice.invoice_id },
    });
  }
}
