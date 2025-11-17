import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TermsService } from 'src/app/services/terms.service';

@Component({
  selector: 'app-terms-list',
  templateUrl: './terms-list.component.html',
  styleUrls: ['./terms-list.component.scss'],
})
export class TermsListComponent implements OnInit {
  terms: any[] = [];
  paginatedTerms: any[] = [];
  page = 1;
  itemsPerPage = 5;
  userId!: number;

  columns = [{ key: 'terms', label: 'Terms & Conditions' }];

  constructor(
    private termsService: TermsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // 1️⃣ Load user first
    this.authService.getProfile().subscribe(res => {
      this.userId = res.user.id;

      // 2️⃣ After userId is ready → load terms
      this.getTerms();
    });
  }

  getTerms() {
    this.termsService.getTerms(this.userId).subscribe(res => {
      this.terms = res;
      this.updatePaginatedTerms();
    });
  }

  updatePaginatedTerms() {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    this.paginatedTerms = this.terms.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChanged(page: number) {
    this.page = page;
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
    this.termsService.deleteTerms(item.term_id, this.userId).subscribe(res => {
      if (res) {
        this.getTerms();
      }
    });
  }
}
