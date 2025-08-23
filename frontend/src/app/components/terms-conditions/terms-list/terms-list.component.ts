import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TermsService } from 'src/app/services/terms.service';

@Component({
  selector: 'app-terms-list',
  templateUrl: './terms-list.component.html',
  styleUrls: ['./terms-list.component.scss'],
})
export class TermsListComponent {
  invoiceId!: number;
  terms: any[] = [];
  paginatedTerms: any[] = [];
  page = 1;
  itemsPerPage = 5;

  constructor(
    private termsService: TermsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTerm();
  }

  getTerm() {
    this.termsService.getTermsByInvoice().subscribe((res) => {
      this.terms = res;
      this.updatePaginatedTerms();
    });
  }

  updatePaginatedTerms() {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTerms = this.terms.slice(startIndex, endIndex);
  }

  onPageChanged(p: number) {
    this.page = p;
    this.updatePaginatedTerms();
  }

  onPageSizeChanged(size: number) {
    this.itemsPerPage = size;
    this.page = 1;
    this.updatePaginatedTerms();
  }

  editTerm(item: any) {
    this.router.navigate(['/terms&conditions/create'], {
      queryParams: { id: item.term_id },
    });
  }

  deleteTerm(item: any) {
    this.termsService.deleteTerms(item.term_id).subscribe((res) => {
      if (res) {
        this.getTerm();
      }
    });
  }
}
