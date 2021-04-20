import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { post } from '../post.model';
@Component({
  selector: 'app-post-home',
  templateUrl: './post-home.component.html',
  styleUrls: ['./post-home.component.css'],
})
export class PostHomeComponent implements OnInit {
  @Output() post_emit = new EventEmitter<post>();
  postForms = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });
  constructor() {}

  ngOnInit(): void {}
  onSubmit() {
    this.post_emit.emit(this.postForms.value);
  }
  sendPost() {}
}
