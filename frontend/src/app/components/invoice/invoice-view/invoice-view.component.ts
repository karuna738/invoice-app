import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.scss'],
})
export class InvoiceViewComponent implements OnInit {
  invoice: any = {};
  billTo: any;
  billFrom: any;
  userId!: number;
  invoiceId!: number;

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private customerService: CustomerService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // STEP 1 → Get user first
    this.authService.getProfile().subscribe(res => {
      this.userId = res.user.id;

      // STEP 2 → Read invoice ID
      this.route.queryParams.subscribe(q => {
        this.invoiceId = q['id'];
        if (this.invoiceId) {
          this.loadInvoiceData();
        }
      });
    });
  }

  /**********************************************************
   * LOAD INVOICE DETAILS
   **********************************************************/
  loadInvoiceData() {
    this.invoiceService.getInvoiceItems(this.invoiceId, this.userId).subscribe(res => {
      this.invoice = res;

      // Load billTo and billFrom
      this.loadBillDetails();
    });
  }

  /**********************************************************
   * GET CUSTOMER DETAILS
   **********************************************************/
  loadBillDetails() {
    this.customerService.getCustomers(this.userId).subscribe(res => {
      this.billTo = res.find((c: any) => c.customer_id === this.invoice.bill_to_id);
      this.billFrom = res.find((c: any) => c.customer_id === this.invoice.bill_from_id);
    });
  }

  /**********************************************************
   * DOWNLOAD PDF
   **********************************************************/
  downloadPDF() {
    const invoiceElement = document.getElementById('invoice');

    if (!invoiceElement) return;

    html2canvas(invoiceElement, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgWidth = 210; // A4 width
      const pageHeight = 295; // A4 height
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('invoice.pdf');
    });
  }
}
