import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './home/home.component';
import { CardBlogComponent } from './components/card-blog/card-blog.component';
import { UserBlogsComponent } from './user-blogs/user-blogs.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
{ path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  {path: 'home', component: HomeComponent},
  { path: 'blogs', component: CardBlogComponent },
  { path: 'blogs/:type', component: CardBlogComponent },
  { path: 'user', component: UserProfileComponent },
  { path: 'user/:username', component: UserProfileComponent },
  { path: 'blog/:id', component: BlogDetailsComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
 
];
