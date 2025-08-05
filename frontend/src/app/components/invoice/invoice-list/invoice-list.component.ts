import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from 'src/app/services/invoice.service';


@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit{
  invoices:any = [];
  constructor(private invoiceService: InvoiceService, private rout: Router) {}
  ngOnInit() {
    this.invoiceService.getInvoices().subscribe(data => {
      console.log('data',data);
      this.invoices = data;
    });
  }

  addPage(){
    this.rout.navigate(['/invoices/create']);
  }
  viewPage(item:any){
    this.rout.navigate(['/invoices/view'],{queryParams: { id: item.invoice_id}});
  }
}
