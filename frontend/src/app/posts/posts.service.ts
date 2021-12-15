import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const HTTP_SERVER = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private client: HttpClient) { }

  getWorkProviderList(state: any, city: any, page: any) {
    return this.client.get(`${HTTP_SERVER}/posts/${state}/${city}/${page}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
  }
  getWorkRequestList(state: any, city: any, page: any) {
    return this.client.get(`${HTTP_SERVER}/posts/${state}/${city}/${page}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
  }
  addNewPost(obj: any) {
    return this.client.post(`${HTTP_SERVER}/posts`, obj, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
  }
}
