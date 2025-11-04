import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
 loginForm!: FormGroup;
  submitted = false;
  showPassword = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    // Example console output
    console.log('Login data:', this.loginForm.value);
  }
}