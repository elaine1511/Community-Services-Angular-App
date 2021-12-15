import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <h3>
      The Place Where You Can Find The Perfect Services For Your Business
</h3>
<div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
      <a [routerLink]="['/', 'posts','providers']" class="btn btn-primary">Work Providers</a>
        <h5 class="card-title">Service Offers</h5>
        <p class="card-text">Display all services that offer from your community skilled workers.</p>
        <a class="btn btn-primary btn-sm" [routerLink]="['/posts/add']"
            routerLinkActive="active" role="button" aria-pressed="true">Add Post</a>
      </div>
    </div>
  </div>
  
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
      <a [routerLink]="['/', 'posts','requests']" class="btn btn-primary">Work Requests</a>
        <h5 class="card-title">Service Needs</h5>
        <p class="card-text">Display all the services that need help from your communicty people.</p>
        <a class="btn btn-primary btn-sm" [routerLink]="['/posts/add']"
            routerLinkActive="active"role="button" aria-pressed="true">Add Post</a>
      </div>
    </div>
  </div>
</div>



  `,
  styles: [`
  `
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
