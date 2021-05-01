import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
@Component({
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  constructor(private authservice: AuthService, private router: Router) {}
  signup(signupForm: NgForm) {
    if (signupForm.invalid) return;
    this.authservice
      .createUser(signupForm.value)
      .subscribe((result: { _message: string }) => {
        console.log(result._message);
        if (result) {
          this.router.navigate(['/']);
        }
      });
  }
}
