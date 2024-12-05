import { Component } from '@angular/core';
import { SearchbarComponent } from "../components/searchbar/searchbar.component";
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { CardBlogComponent } from "../components/card-blog/card-blog.component";
import { RouterOutlet } from '@angular/router';
import { UserProfileComponent } from "../user-profile/user-profile.component";
import { UserBlogsComponent } from "../user-blogs/user-blogs.component";
import { BlogDetailsComponent } from '../blog-details/blog-details.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchbarComponent, SidebarComponent, CardBlogComponent, RouterOutlet, UserProfileComponent, UserBlogsComponent, BlogDetailsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
