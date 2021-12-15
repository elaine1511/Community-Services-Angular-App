import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-provider-lists',
  templateUrl: './provider-lists.component.html',
  styleUrls: ['./provider-lists.component.css']
})
export class ProviderListsComponent implements OnInit {
  city = localStorage.getItem('city');
  state = localStorage.getItem('state');
  userId = localStorage.getItem('userId');
  postLists: any[] = [];
  page = 1;
  subscription!: Subscription;

  constructor(private service: PostsService, private router: Router) {
    if (this.city && this.state)
      this.subscription = this.service.getWorkProviderList(this.state, this.city, this.page).subscribe((result: any) => {
        this.postLists = result;
        console.log('post:', this.postLists)
      })
  }

  ngOnInit(): void {
  }
  loadmore() {
    this.page++;
    this.service.getWorkProviderList(this.state, this.city, this.page).subscribe((result: any) => {
      this.postLists = result;
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
