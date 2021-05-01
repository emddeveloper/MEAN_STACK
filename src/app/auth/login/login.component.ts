import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private authservice: AuthService, private router: Router) {}
  login(loginform: NgForm) {
    this.authservice
      .authenticateUser(loginform.value)
      .subscribe((result: any) => {
        if (result.token) {
          this.router.navigate(['/']);
        }
      });
  }
}
