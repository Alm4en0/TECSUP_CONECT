import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './home/home.component';
import { CardBlogComponent } from './components/card-blog/card-blog.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'blogs', component: CardBlogComponent, canActivate: [AuthGuard] },
  {
    path: 'blogs/:type',
    component: CardBlogComponent,
    canActivate: [AuthGuard],
  },
  { path: 'user', component: UserProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'user/:username',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'blog/:id',
    component: PostDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
