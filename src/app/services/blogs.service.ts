import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { Blog } from '../models/Blog';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  private blogs = new Subject<Blog[]>();
  blogs$ = this.blogs.asObservable();

  private userId: number = 2021525;

  constructor(private http: HttpClient) { }

  /*
    Obervable so when the array is updated in component,
    service updates array here   
  */
  getBlogs(): void {

    if(!localStorage.getItem('blogs')) {
      this.http.
      get<Blog[]>('https://mi-blogs.azurewebsites.net/api/Blogs/user/'+ this.userId)
      .subscribe((allBlogs) => {
        this.blogs.next(allBlogs);

        console.log("Blogs in API: ", allBlogs);
        
        localStorage.setItem('blogs', JSON.stringify(allBlogs));
      });
    } else { 
      this.blogs.next(JSON.parse(localStorage.getItem('blogs')));
    }

  }
 
  getBlog(blogId: number): Blog {

    let blogs: Blog[] = JSON.parse(localStorage.getItem('blogs'));
    return blogs.filter((b) => b.id == blogId)[0]; 

  }

  // Add blog to DB
  addBlog(title: string): Observable<Blog> {

    // The api only allows the id 0 because it seems to take care of itself so this one is for the POST request
    const newBlog: Blog = {id: 0, title: title, created: new Date(), userId: 2021525, posts: []}
    return this.http.post<Blog>('https://mi-blogs.azurewebsites.net/api/Blogs', newBlog);

  }

  // Delete blog from DB
  deleteBlog(blogId: number): Observable<Blog> {
    return this.http.delete<Blog>('https://mi-blogs.azurewebsites.net/api/Blogs/'+ blogId);
  }

  // Update blog in DB
  updateBlog(updatedBlog: Blog): Observable<Blog> {

    let blogs: Blog[] = JSON.parse(localStorage.getItem('blogs'));

    // Update blogtitle in LS
    for(let i=0; i<blogs.length; i++) {
      if(updatedBlog.id == blogs[i].id) {
        blogs[i].title = updatedBlog.title;
        console.log("Updating blog...");
      }
    }

    localStorage.setItem('blogs', JSON.stringify(blogs));

    return this.http.put<Blog>('https://mi-blogs.azurewebsites.net/api/Blogs/'+ updatedBlog.id, updatedBlog)
  }

}
