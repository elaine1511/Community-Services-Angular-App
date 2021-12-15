import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  addPostForm!: FormGroup;
  type: any[] = ['Work Providers', 'Work Requests'];
  constructor(private fb: FormBuilder,
    private service: PostsService,
    private router: Router) {
    this.addPostForm = this.fb.group({
      'createrName': [localStorage.getItem('username'), Validators.required],
      'serviceType': ['Work Requests'],
      'createrId': [localStorage.getItem('userId'), Validators.required],
      'city': ['', Validators.required],
      'state': ['', Validators.required],
      'serviceContent': ['', Validators.required],
      'offerPrice': ['', Validators.required],
      'requestTime': ['', Validators.required],
    })
  };
  ngOnInit(): void {
  }
  addPost(): void {
    this.service.addNewPost(this.addPostForm.value).subscribe((result: any) => {
      console.log(result)
      if (this.addPostForm.value.serviceType === 'Work Requests') {
        this.router.navigate(['/', 'posts', 'requests'])
      } else if (this.addPostForm.value.serviceType === 'Work Providers') {
        this.router.navigate(['/', 'posts', 'providers'])
      }
    })
  };

}
