import { Component } from '@angular/core';
import { post } from './post.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  storedPost: post[] = [];
  on_post_emit(value: post) {
    this.storedPost.push(value);
  }
}
