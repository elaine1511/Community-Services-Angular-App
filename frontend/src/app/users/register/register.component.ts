import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, flatMap, Subscription } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  signupForm: FormGroup;
  subscription!: Subscription;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      'username': ['', Validators.required],
      'email': ['', Validators.required],
      'password': ['', Validators.required],
      'address': ['', Validators.required],
      'city': ['', Validators.required],
      'state': ['', Validators.required],
      'zipcode': ['', Validators.required],
      'phone': ['', Validators.required],
    })

    this.signupForm.get('username')?.valueChanges
      .pipe(
        debounceTime(500),
        flatMap((text: string) => this.userService.checkUsername(text))
      )
      .subscribe((response: any) => {
        console.log(response)
        response.success ? this.signupForm.get('username')?.setErrors({ 'incorrect': true }) : this.signupForm.get('username')?.setErrors(null)

      })
  }
  get email(): FormControl {
    return this.signupForm.get('email') as FormControl
  }
  get username(): FormControl {
    return this.signupForm.get('username') as FormControl
  }
  get password(): FormControl {
    return this.signupForm.get('password') as FormControl
  }

  onSubmit(): void {
    this.subscription = this.userService.signUp(this.signupForm.value).subscribe(result => {
      console.log(result)
      this.router.navigate(['/', 'users', 'login'])
    });
  }
  goBack() {
    this.router.navigate(['/', 'users', 'login']);
    alert("Signed up successfully!")
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
