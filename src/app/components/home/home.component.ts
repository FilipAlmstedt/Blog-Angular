import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/Blog';
import { BlogsService } from 'src/app/services/blogs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Homecomponent is showing all the blogs the user created
  blogs: Blog[] = [];

  constructor(private service: BlogsService) { }

  ngOnInit(): void {
    this.service.blogs$.subscribe((data) => {
      this.blogs = data;

      console.log('Blogs in LS: ', this.blogs);
      
    });

    this.service.getBlogs();
  }

}
