import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const HTTP_SERVER = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private client: HttpClient) { }

  signUp(obj: any) {
    return this.client.post(`${HTTP_SERVER}/users/signup`, obj)
  }
  checkUsername(username: string) {
    return this.client.get(`${HTTP_SERVER}/users/find/${username}`)
  }
  logIn(obj: any) {
    return this.client.post(`${HTTP_SERVER}/users/login`, obj)
  }
  getDetailUser(user_id: string) {
    return this.client.get(`${HTTP_SERVER}/users/${user_id}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
  }
  getAllUser() {
    return this.client.get(`${HTTP_SERVER}/users`)
  }
  updateUser(user_id: any, user: any) {
    return this.client.put(`${HTTP_SERVER}/users/${user_id}`, user, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
  }
}
