import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
// import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  subscription!: Subscription;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    // private snackbar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      'username': ['', Validators.required],
      'email': ['', Validators.required],
      'password': ['', Validators.required],
    })
  }
  get email(): FormControl {
    return this.loginForm.get('email') as FormControl
  }
  get username(): FormControl {
    return this.loginForm.get('username') as FormControl
  }
  get password(): FormControl {
    return this.loginForm.get('password') as FormControl
  }

  onLogin(): void {
    this.subscription = this.userService.logIn(this.loginForm.value).subscribe((result: any) => {
      // console.log(result);
      if (result.status === 'Success') {
        localStorage.setItem('token', result.authtoken);
        localStorage.setItem('city', result.city);
        localStorage.setItem('state', result.state);
        localStorage.setItem('userId', result.userId);
        localStorage.setItem('username', result.username);
      } else {
        return result.status;
      }
      this.router.navigate(['/', 'home'], {
        state: {
          userId: result.userId,
          username: result.username,
          address: result.address,
          city: result.city,
          state: result.state,
          phone: result.phone
        }
      });
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
