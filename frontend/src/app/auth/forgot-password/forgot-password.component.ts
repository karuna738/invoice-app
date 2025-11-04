import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
 forgotForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.forgotForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(\+?\d{10,15}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
          )
        ]
      ]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.forgotForm.invalid) {
      return;
    }

    console.log('Reset link sent to:', this.forgotForm.value.username);
    alert('Password reset link has been sent to your registered email/phone.');
  }
}