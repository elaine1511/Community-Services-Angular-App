import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-request-lists',
  templateUrl: './request-lists.component.html',
  styleUrls: ['./request-lists.component.css']
})
export class RequestListsComponent implements OnInit {

  city = localStorage.getItem('city');
  state = localStorage.getItem('state');
  userId = localStorage.getItem('userId');
  postLists: any[] = [];
  page = 1;
  subscription!: Subscription;

  constructor(private service: PostsService, private router: Router) {
    if (this.city && this.state)
      this.subscription = this.service.getWorkRequestList(this.state, this.city, this.page).subscribe((result: any) => {
        this.postLists = result;
        console.log('post:', this.postLists)
      })
  }

  ngOnInit(): void {
  }
  loadmore() {
    this.page++;
    this.service.getWorkRequestList(this.state, this.city, this.page).subscribe((result: any) => {
      this.postLists = result;
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
