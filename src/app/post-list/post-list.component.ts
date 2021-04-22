import { Component, OnInit, Input } from '@angular/core';
import { post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: post[] = [];
  constructor(private PostService: PostService) {}

  ngOnInit(): void {
    this.PostService.getPosts().subscribe((response) => {
      this.posts = response.posts;
    });
  }
}
