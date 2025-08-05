import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.scss'],
})
export class InvoiceViewComponent implements OnInit {
  invoice:any = {};

  constructor(private route: ActivatedRoute, private invoiceService: InvoiceService) {}

ngOnInit() {
  this.route.queryParams.subscribe(queryParams => {
    const id = queryParams['id'];

    if (id) {
      this.invoiceService.getInvoiceItems(id).subscribe(res => {
        this.invoice = res;
      });
    }
  });
}

}
