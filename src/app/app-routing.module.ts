import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { UpdateBlogComponent } from './components/update-blog/update-blog.component';
import { UpdatePostComponent } from './components/update-post/update-post.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent, 
    data: { animation: 'HomePage' } 
  },
  { 
    path: 'Blog/:id',
    component: BlogDetailsComponent,
    data: { animation: 'BlogDetailsPage' }
  },
  { 
    path: 'Post/:id', 
    component: PostDetailsComponent, 
    data: { animation: 'PostDetailsPage' }
  },
  { 
    path: 'Update-Blog/:id', 
    component: UpdateBlogComponent, 
    data: { animation: 'UpdateBlogPage' }  
  },
  { 
    path: 'Update-Post/:id', 
    component: UpdatePostComponent, 
    data: { animation: 'UpdatePostPage' }  
  },
  { 
    path: '**', 
    component: PageNotFoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
