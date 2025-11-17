import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TermsService } from 'src/app/services/terms.service';

@Component({
  selector: 'app-terms-create',
  templateUrl: './terms-create.component.html',
  styleUrls: ['./terms-create.component.scss'],
})
export class TermsCreateComponent implements OnInit {
  termsForm!: FormGroup;
  submitted = false;
  termsId: number | null = null;
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private termsService: TermsService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // 1️⃣ First get the logged-in user
    this.authService.getProfile().subscribe(res => {
      this.userId = res.user.id;

      // 2️⃣ After userId loaded, check URL for terms ID
      this.route.queryParams.subscribe(params => {
        this.termsId = params['id'] ? +params['id'] : null;

        if (this.termsId) {
          this.getTermsData();
        }
      });
    });

    // 3️⃣ Build the form
    this.termsForm = this.fb.group({
      terms: ['', Validators.required],
    });
  }

  getTermsData() {
    this.termsService.getTerms(this.userId).subscribe(res => {
      const data = res.find(v => v.term_id === this.termsId);
      if (data) {
        this.termsForm.patchValue(data);
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.termsForm.invalid) return;

    if (this.termsId) {
      // Update
      this.termsService
        .updateTerms(this.termsId, this.termsForm.value, this.userId)
        .subscribe(() => {
          this.router.navigate(['/terms&conditions']);
        });
    } else {
      // Create
      this.termsService
        .addTerms(this.termsForm.value, this.userId)
        .subscribe(() => {
          this.router.navigate(['/terms&conditions']);
        });
    }
  }
}
