import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Blog } from 'src/app/models/Blog';
import { Post } from 'src/app/models/Post';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {

  @Input() post: Post;
 
  commentId: number = 0;

  addCommentForm = this.fb.group({
    title: ['', [Validators.required]],
    content: ['', [Validators.required]]
  });

  constructor(private commentService: CommentService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  // Get funtions to be used for validation
  get title() {
    return this.addCommentForm.get('title');
  }
  get content() {
    return this.addCommentForm.get('content');
  }

  addNewComment(): void {
    if(this.post.comments.length !== 0) {
      this.commentId = this.post.comments[this.post.comments.length-1].id++;
    }

    this.commentService.addComment(this.post.id, this.addCommentForm.value.title, this.addCommentForm.value.content, this.post).subscribe((responseData) => {
      
      console.log("New comment", responseData.title ,"was added!");

      let blogs: Blog[] = JSON.parse(localStorage.getItem('blogs'));

      // Find the right post-comments array to store new comment in
      for(let i=0; i<blogs.length; i++) {
        for(let j=0; j<blogs[i].posts.length; j++) {
          if(blogs[i].posts[j].id == this.post.id) {
            blogs[i].posts[j].comments.push(responseData);
            localStorage.setItem('blogs', JSON.stringify(blogs));
          }

        }
      }

      //To update window so the user don't have to manually reload the site to see new Blog
      window.location.reload();
      
    });

    
  }

}
