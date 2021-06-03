import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { BlogComponent } from './components/blog/blog.component';
import { PostComponent } from './components/post/post.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { CommentComponent } from './components/comment/comment.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { UpdateBlogComponent } from './components/update-blog/update-blog.component';
import { UpdatePostComponent } from './components/update-post/update-post.component';

@NgModule({
  declarations: [
    AppComponent,
    AddBlogComponent,
    PageNotFoundComponent,
    HomeComponent,
    BlogDetailsComponent,
    AddPostComponent,
    BlogComponent,
    PostComponent,
    PostDetailsComponent,
    CommentComponent,
    AddCommentComponent,
    UpdateBlogComponent,
    UpdatePostComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, ReactiveFormsModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
