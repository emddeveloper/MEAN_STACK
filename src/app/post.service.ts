import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { post } from './post.model';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}
  getPosts() {
    return this.http.get<{ message: string; posts: post[] }>(
      'http://localhost:3000/api/posts'
    );
  }
  sendPost(request: post) {
    return this.http.post<{ message: string; posts: post[] }>(
      'http://localhost:3000/api/posts',
      request
    );
  }
}
