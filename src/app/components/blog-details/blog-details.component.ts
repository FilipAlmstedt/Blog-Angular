import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from 'src/app/models/Blog';
import { BlogsService } from 'src/app/services/blogs.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {

  blogId: number = 0;
  blog: Blog;

  constructor(
      private route: ActivatedRoute, 
      private blogService: BlogsService, 
      private postService: PostsService
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      
      this.blogId = parseInt(params.get('id'));
      this.blog = this.blogService.getBlog(this.blogId);

      this.postService.blog$.subscribe((data) => {
        
        this.blog.posts = data.posts;

      });

      console.log('Posts from Blog', this.blog.title ,': ' ,this.blog.posts);
      this.postService.getPosts(this.blog);

    });
  }

}
