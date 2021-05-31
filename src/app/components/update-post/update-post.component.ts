import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit {

  postId: number;
  post: Post;

  updatePostForm = this.fb.group({
    title: ['', [Validators.required]],
    content: ['', [Validators.required]]
  });

  constructor(
      private route: ActivatedRoute,
      private postService: PostsService,
      private fb: FormBuilder,
      private router: Router
      ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.postId = parseInt(params.get('id'));
      this.post = this.postService.getPost(this.postId);
    });
  }

  // Get functions to be used for validation
  get title() {
    return this.updatePostForm.get('title');
  }
  get content() {
    return this.updatePostForm.get('content');
  }
  
  updatePost(): void {

    let updatedPost = this.post;
    updatedPost.title = this.updatePostForm.value.title;
    updatedPost.content = this.updatePostForm.value.content;
    updatedPost.modified = new Date();

    this.postService.updatePost(updatedPost).subscribe((responseData) => {
      
      console.log("Update post sucessful!");
      
    });

    // Redirect to home component
    this.router.navigate(['Post', this.post.id]);

  }

}
