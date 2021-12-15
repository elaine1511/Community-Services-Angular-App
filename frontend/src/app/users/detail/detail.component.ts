import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  subscription!: Subscription;
  userId: any = localStorage.getItem('userId')
  user: any;
  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.subscription = this.userService.getDetailUser(this.userId).subscribe((result: any) => {
      console.log('user:', result)
      this.user = result.response
    })
  }

  onEdit() {
    this.router.navigate(['/', 'users', 'edit'], {
      state: { userInfo: this.user }
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
