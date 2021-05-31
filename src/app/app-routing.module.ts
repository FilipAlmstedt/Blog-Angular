import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { UpdateBlogComponent } from './components/update-blog/update-blog.component';
import { UpdatePostComponent } from './components/update-post/update-post.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Blog/:id', component: BlogDetailsComponent },
  { path: 'Post/:id', component: PostDetailsComponent },
  { path: 'Update-Blog/:id', component: UpdateBlogComponent },
  { path: 'Update-Post/:id', component: UpdatePostComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
