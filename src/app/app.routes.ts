import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './home/home.component';
import { CardBlogComponent } from './components/card-blog/card-blog.component';
import { UserBlogsComponent } from './user-blogs/user-blogs.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
<<<<<<< HEAD
import { AuthGuard } from './guard/auth.guard';
=======
import { BlogDetailsComponent } from './blog-details/blog-details.component';
>>>>>>> f7e00d106f1ed2ab2e89fb20306bd10d377a4dc8

export const routes: Routes = [
{ path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  {path: 'home', component: HomeComponent},
  { path: 'blogs', component: CardBlogComponent },
  { path: 'blogs/:type', component: CardBlogComponent },
  { path: 'user', component: UserProfileComponent },
  { path: 'user/:username', component: UserProfileComponent },
<<<<<<< HEAD
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
=======
  { path: 'blog/:id', component: BlogDetailsComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
 
>>>>>>> f7e00d106f1ed2ab2e89fb20306bd10d377a4dc8
];
