import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TermsService } from 'src/app/services/terms.service';

@Component({
  selector: 'app-terms-list',
  templateUrl: './terms-list.component.html',
  styleUrls: ['./terms-list.component.scss']
})
export class TermsListComponent {
  invoiceId!: number;
  terms: any[] = [];

  constructor(private termsService: TermsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.getPayments();
  }

  getPayments() {
    this.termsService.getTermsByInvoice().subscribe((res) => {
      this.terms = res;
    });
  }
}
