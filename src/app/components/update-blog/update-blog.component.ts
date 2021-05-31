import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from 'src/app/models/Blog';
import { BlogsService } from 'src/app/services/blogs.service';

@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.scss']
})
export class UpdateBlogComponent implements OnInit {

  blogId: number;
  blog: Blog;

  // Added formBuilder
  updateBlogForm = this.fb.group({
    title: ['', [Validators.required]]
  });


  constructor(
      private route: ActivatedRoute, 
      private blogService: BlogsService, 
      private fb: FormBuilder,
      private router: Router
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.blogId = parseInt(params.get('id'));
      this.blog = this.blogService.getBlog(this.blogId);
    });
  }

  get title() {
    return this.updateBlogForm.get('title');
  }

  updateBlog(): void {

    let updatedBlog: Blog = this.blog;

    updatedBlog.title = this.updateBlogForm.value.title;

    this.blogService.updateBlog(updatedBlog).subscribe((responseData) => {
      console.log("Blog", updatedBlog.title, "updated!");
      
    });

    // Redirect to home component
    this.router.navigate(['']);

  }

}
