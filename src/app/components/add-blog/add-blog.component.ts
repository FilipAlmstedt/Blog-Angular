import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Blog } from 'src/app/models/Blog';
import { BlogsService } from 'src/app/services/blogs.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {

  @Input() blogs: Blog[];
  createID: number = 0;

  // Added formBuilder
  addBlogForm = this.fb.group({
    title: ['', [Validators.required]]
  });

  constructor(private service: BlogsService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  // Get funtion to return title variable to be used for validation
  get title() {
    return this.addBlogForm.get('title');
  }
  
  addNewBlog(): void {
    
    if(this.blogs.length !== 0) {
      this.createID = this.service.getBlog(this.blogs[this.blogs.length-1].id).id++;
    }
    
    this.service.addBlog(this.addBlogForm.value.title).subscribe((responseData) => {

      console.log('New Blog: ', responseData.title, ' added.');
      
      // Store new Blog in LS
      let blogs: Blog[] = JSON.parse(localStorage.getItem('blogs'));
      blogs.push(responseData);
      localStorage.setItem('blogs', JSON.stringify(blogs));
      

      //To update window so the user don't have to manually reload the site to see new Blog
      window.location.reload();
      
    });
    
  }


}
