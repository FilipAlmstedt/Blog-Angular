import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Comment } from '../models/Comment';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private post = new Subject<Post>();
  post$ = this.post.asObservable();

  constructor(private http: HttpClient) { }

  getComments(post: Post): void {
    /*
      Check if we can collect from LS instead of using GET request again
    */
    if(!localStorage.getItem('blogs')) {
      this.http
        .get<Post>('https://mi-blogs.azurewebsites.net/api/Comments/'+ post.id)
        .subscribe((chosenBlog) => {
          this.post.next(chosenBlog);  
        });
    } else {
      this.post.next(post);
    }
  
  }

  addComment(postId: number, title: string, content: string, post: Post): Observable<Comment> {

     /*
      The api only allows the id 0 because it seems to take care of itself so this one is for the POST request,
      the api didn't allow me to send in an object with the "real" id.
    */
    const newComment: Comment = {id: 0, title: title, content: content, postId: postId, post: post};
    return this.http.post<Comment>('https://mi-blogs.azurewebsites.net/api/Comments', newComment);

  }

  // In future use, Not neccessary for the assignment but can be use in expanding the application
  deleteComment(commentId: number): Observable<Comment> {
    return this.http.delete<Comment>('https://mi-blogs.azurewebsites.net/api/Comments/'+ commentId);
  }

}
