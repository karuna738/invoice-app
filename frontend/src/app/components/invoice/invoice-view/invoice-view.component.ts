import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CustomerService } from 'src/app/services/customer.service';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.scss'],
})
export class InvoiceViewComponent implements OnInit {
  invoice:any = {};
  billTo: any;
  billFrom: any;

  constructor(private route: ActivatedRoute, private invoiceService: InvoiceService, private customerService: CustomerService) {}

ngOnInit() {
  this.route.queryParams.subscribe(queryParams => {
    const id = queryParams['id'];
    if (id) {
      this.invoiceService.getInvoiceItems(id).subscribe(res => {
        if(res){
        this.invoice = res;
        this.getbill();
        }
      });
    }
  });
}

getbill(){
  this.customerService.getCustomers().subscribe(res => {
    console.log('ddd',this.invoice);
    
    if(res){
    this.billTo = res.find(item => item.customer_id === this.invoice.bill_to_id);
    this.billFrom = res.find(item => item.customer_id === this.invoice.bill_from_id);
    console.log('bill',this.billFrom);
    
    }
  })
}

downloadPDF() {
  const invoiceElement = document.getElementById('invoice');
  if (invoiceElement) {
    html2canvas(invoiceElement, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add extra pages if content overflows
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


}
