import { Component, OnInit, Input } from '@angular/core';
import { post } from '../post.model';
import { PostService } from '../post.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: post[] = [];
  constructor(private PostService: PostService) {}
  onDelete(id: number) {
    this.PostService.delete(id).subscribe((response) => {
      console.log(response);
      this.getAllPosts();
    });
  }
  getAllPosts() {
    this.PostService.getPosts()
      .pipe(
        map((response) => {
          return response.posts.map((post) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
            };
          });
        })
      )
      .subscribe((response) => {
        this.posts = response;
        console.log(this.posts);
      });
  }

  ngOnInit(): void {
    this.getAllPosts();
  }
  // transforming the data id and _id
}
