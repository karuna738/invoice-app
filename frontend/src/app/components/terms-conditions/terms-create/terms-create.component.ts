import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TermsService } from 'src/app/services/terms.service';

@Component({
  selector: 'app-terms-create',
  templateUrl: './terms-create.component.html',
  styleUrls: ['./terms-create.component.scss'],
})
export class TermsCreateComponent {
  termsForm!: FormGroup;
  submitted = false;
  termsId: any;

  constructor(
    private fb: FormBuilder,
    private termsService: TermsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((res) => {
      this.termsId = +res['id'];
      if (this.termsId) {
        this.getTermsData();
      }
    });
  }

  ngOnInit(): void {
    this.termsForm = this.fb.group({
      terms: ['', Validators.required],
    });
  }

  getTermsData() {
    this.termsService.getTermsByInvoice().subscribe((res) => {
      const termsAndService = res.find((vl) => vl.term_id === this.termsId);
      if (termsAndService) {
        this.termsForm.patchValue(termsAndService);
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.termsForm.invalid) return;

    if (this.termsId) {
      this.termsService.updateTerms(this.termsId, this.termsForm.value).subscribe(() => {
        this.router.navigate(['/terms&conditions']);
      });
    } else {
      this.termsService.addTerms(this.termsForm.value).subscribe(() => {
        this.router.navigate(['/terms&conditions']);
      });
    }
  }
}
