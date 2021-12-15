import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  user: any;
  editForm!: FormGroup;
  subscription!: Subscription;
  constructor(private fb: FormBuilder,
    private service: UserService,
    private router: Router) {
    const extras: any = this.router.getCurrentNavigation()?.extras as string;
    this.user = extras.state.userInfo;
    console.log(this.user)
    this.editForm = this.fb.group({
      'username': [this.user.username, Validators.required],
      'email': [this.user.email, Validators.required],
      'password': [this.user.password, Validators.required],
      'address': [this.user.address, Validators.required],
      'city': [this.user.city, Validators.required],
      'state': [this.user.state, Validators.required],
      'zipcode': [this.user.zipcode, Validators.required],
      'phone': [this.user.phone, Validators.required],
    })
  }

  ngOnInit(): void {
  }

  editUser() {
    this.subscription = this.service.updateUser(this.user._id, this.editForm.value).subscribe(response => {
      this.router.navigate(['/', 'users'])
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
