import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TermsService } from 'src/app/services/terms.service';

@Component({
  selector: 'app-terms-create',
  templateUrl: './terms-create.component.html',
  styleUrls: ['./terms-create.component.scss']
})
export class TermsCreateComponent {
  termsForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private termsService: TermsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.termsForm = this.fb.group({
      terms: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.termsForm.invalid) return;

    const paymentData = {
      ...this.termsForm.value
    };

    this.termsService.addTerms(paymentData).subscribe(() => {
      this.router.navigate(['/terms&conditions']);
    });
  }
}
