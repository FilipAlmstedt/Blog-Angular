import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from 'src/app/models/Blog';
import { BlogsService } from 'src/app/services/blogs.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  @Input() blog: Blog;

  constructor(private router: Router, private blogService: BlogsService) { }

  ngOnInit(): void {
  }

  showBlogDetails(): void {
    this.router.navigate(['Blog', this.blog.id]);
  }

  redirectToUpdateBlog(): void {
    this.router.navigate(['Update-Blog', this.blog.id])
  }

  deleteBlog(): void {
    this.blogService.deleteBlog(this.blog.id).subscribe((responseData) => {
      
     // Find and delete blog from LS 
     let blogs: Blog[] = JSON.parse(localStorage.getItem('blogs'));

     for(let i=0; i<blogs.length; i++) {
       if(this.blog.id == blogs[i].id){
         blogs.splice(i, 1);
       }
     }

     localStorage.setItem('blogs', JSON.stringify(blogs));

    //To update window so the user don't have to manually reload the site to see new Blog
    window.location.reload();
    
    });
  }
  

}
