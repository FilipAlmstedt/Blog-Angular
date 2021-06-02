import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Blog } from '../models/Blog';

@Injectable({
  providedIn: 'root'
})

/* 
  Mock-service to test to send data to hone componet. 
  This example will include data from before even though in real life the array might be empty 
*/
export class MockBlogService {

  private blogs = new Subject<Blog[]>();
  blogs$ = this.blogs.asObservable();

  constructor() { }

  testBlogs: Blog[] = [
    {id: 0, title: 'Filips Testblog 1', created: new Date(), userId: 2021525, posts: []},
    {id: 1, title: 'Filips Testblog 2', created: new Date(), userId: 2021525, posts: []}
  ]

  getBlogs(): void {
    this.blogs.next(this.testBlogs)
  }  
}
