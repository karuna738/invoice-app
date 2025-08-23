import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TermsService } from 'src/app/services/terms.service';

@Component({
  selector: 'app-terms-list',
  templateUrl: './terms-list.component.html',
  styleUrls: ['./terms-list.component.scss']
})
export class TermsListComponent {
  invoiceId!: number;
  terms: any[] = [];

  constructor(private termsService: TermsService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
      this.getTerm();
  }

  getTerm() {
    this.termsService.getTermsByInvoice().subscribe((res) => {
      this.terms = res;
    });
  }

  editTerm(item: any) {
  console.log("Edit term:", item);
    this.router.navigate(['/terms&conditions/create'], { queryParams: {'id': item.term_id}})
}

deleteTerm(item: any) {
  this.termsService.deleteTerms(item.term_id).subscribe(res => {
    if(res){
      this.getTerm();
    }
  })
}

}
