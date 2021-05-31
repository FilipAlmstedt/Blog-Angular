import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Blog } from '../models/Blog';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private blog = new Subject<Blog>();
  blog$ = this.blog.asObservable();

  constructor(private http: HttpClient) { }

  getPosts(blog: Blog): void {

    /*
      Check if we can collect from LS instead of using GET request again
    */
    if(!localStorage.getItem('blogs')) {
      this.http
        .get<Blog>('https://mi-blogs.azurewebsites.net/api/Blogs/'+ blog.id)
        .subscribe((chosenBlog) => {
          this.blog.next(chosenBlog);  
        });
    } else {
      this.blog.next(blog);
    }

  }
  
  getPost(postId: number): Post {
    let blogs: Blog[] = JSON.parse(localStorage.getItem('blogs'));
    let posts: Post[];

    /*
      Looping through all post lists in the blogs until i found the right posts array to send to blog details component.
      Not the best solution but will do for now.
    */
    for(let i=0; i<blogs.length; i++) {

      if(blogs[i].posts.length !== 0) {
        for(let j=0; j<blogs[i].posts.length; j++) {
       
          if(postId == blogs[i].posts[j].id) {
            posts = blogs[i].posts;
          }
        
        }
      }

    }

    return posts.filter((p) => p.id == postId)[0];
  }

  // Add post in DB
  addPost(blogId: number, title: string, content: string): Observable<Post> {
    
    // The api only allows the id 0 because it seems to take care of itself so this one is for the POST request
    const newPost: Post = {id: 0, title: title, content: content, created: new Date(), modified: new Date(), blogId: blogId , comments: []};
    return this.http.post<Post>('https://mi-blogs.azurewebsites.net/api/Posts', newPost);

  }

  // Delete post in DB
  deletePost(postId: number): Observable<Post> {
    return this.http.delete<Post>('https://mi-blogs.azurewebsites.net/api/Posts/'+ postId);
  }

  // Update post in DB
  updatePost(updatedPost: Post): Observable<Post> {

    let blogs: Blog[] = JSON.parse(localStorage.getItem('blogs'));

    // Update the post object in LS
    for(let i=0; i<blogs.length; i++) {
      for(let j=0; j<blogs[i].posts.length; j++) {
        if(updatedPost.id == blogs[i].posts[j].id) {
          blogs[i].posts[j].title = updatedPost.title;
          blogs[i].posts[j].content = updatedPost.content;
          blogs[i].posts[j].modified = updatedPost.modified;
          console.log("Updating post...");
        }  
      }
    }

    localStorage.setItem('blogs', JSON.stringify(blogs));

    return this.http.put<Post>('https://mi-blogs.azurewebsites.net/api/Posts/'+ updatedPost.id, updatedPost);
  }

}
