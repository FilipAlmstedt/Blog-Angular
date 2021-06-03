import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Blog } from 'src/app/models/Blog';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  @Input() blog: Blog;
 
  postId : number = 0;

  addPostForm = this.fb.group({
    title: ['', [Validators.required]],
    content: ['' , [Validators.required]]
  });

  constructor(private service: PostsService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  // Get funtions to be used for validation
  get title() {
    return this.addPostForm.get('title');
  }
  get content() {
    return this.addPostForm.get('content');
  }

  addNewPost(): void {
    
    if(this.blog.posts.length !== 0){
      this.postId = this.blog.posts[this.blog.posts.length-1].id++;
    }

    this.service.addPost(this.blog.id, this.addPostForm.value.title, this.addPostForm.value.content, this.blog).subscribe((responseData) => {
      console.log('Added new Post in Blog: ' , responseData.title , ' BlogID:', responseData.blogId);

      let blogs: Blog[] = JSON.parse(localStorage.getItem('blogs'));

      // Find the right blog located in localStorage by looping through blog array and comparing blogID:s  
      for(let i=0; i<blogs.length; i++) {
        if(blogs[i].id == responseData.blogId || blogs[i].posts.length == 0) {
          blogs[i].posts.push(responseData);
          console.log("Posts currently in Blog ", blogs[i].title, ": ", blogs[i].posts);    
        }
      }
  
      localStorage.setItem('blogs', JSON.stringify(blogs));

      //To update window so the user don't have to manually reload the site to see new Blog
      window.location.reload();
    }) 
   
  }

}
