import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

}
