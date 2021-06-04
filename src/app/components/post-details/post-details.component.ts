import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { CommentService } from 'src/app/services/comment.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  post: Post;
  postId: number;

  constructor(private route: ActivatedRoute, private postService: PostsService, private commentService: CommentService) { }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe((params) => {
      
      this.postId = parseInt(params.get('id'));
      this.post = this.postService.getPost(this.postId);

      this.commentService.post$.subscribe((data) => {

        this.post.comments = data.comments;

      });

      this.commentService.getComments(this.post);

    });    
    
    console.log("Comments in", this.post.title, ":", this.post.comments);
    

  }

}
