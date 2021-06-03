import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from 'src/app/models/Blog';
import { Post } from 'src/app/models/Post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: Post;

  constructor(private router: Router, private postService: PostsService) { }

  ngOnInit(): void {
  }

  showPostDetails(): void {
    this.router.navigate(['Post', this.post.id]);
  }

  deletePost(): void {
    this.postService.deletePost(this.post.id).subscribe((responseData) => {

      // Delete chosen post from LS 
      let blogs: Blog[] = JSON.parse(localStorage.getItem('blogs'));

      // Find the right blog located in localStorage by looping through blog array and comparing blogID:s  
      for(let i=0; i<blogs.length; i++) {
        if(blogs[i].id == this.post.blogId) {
          for(let j=0; j<blogs[i].posts.length; j++) {
            if(blogs[i].posts[j].id == this.post.id) {
              console.log("Deleted post:",blogs[i].posts[j].title);
              blogs[i].posts.splice(j,1);
            }
          }
        }
      }
  
      localStorage.setItem('blogs', JSON.stringify(blogs));

      //To update window so the user don't have to manually reload the site to see new Blog
      window.location.reload();

    })
  }

  redirectToUpdatePost(): void {
    this.router.navigate(['Update-Post', this.post.id]);
  }

}
