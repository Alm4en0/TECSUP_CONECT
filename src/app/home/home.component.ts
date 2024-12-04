import { Component } from '@angular/core';
import { SearchbarComponent } from "../components/searchbar/searchbar.component";
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { CardBlogComponent } from "../components/card-blog/card-blog.component";
import { RouterOutlet } from '@angular/router';
import { UserProfileComponent } from "../user-profile/user-profile.component";
import { UserBlogsComponent } from "../user-blogs/user-blogs.component";
<<<<<<< HEAD
=======
import { BlogDetailsComponent } from '../blog-details/blog-details.component';
>>>>>>> f7e00d106f1ed2ab2e89fb20306bd10d377a4dc8

@Component({
  selector: 'app-home',
  standalone: true,
<<<<<<< HEAD
  imports: [SearchbarComponent, SidebarComponent, CardBlogComponent, RouterOutlet, UserProfileComponent, UserBlogsComponent],
=======
  imports: [SearchbarComponent, SidebarComponent, CardBlogComponent, RouterOutlet, UserProfileComponent, UserBlogsComponent, BlogDetailsComponent],
>>>>>>> f7e00d106f1ed2ab2e89fb20306bd10d377a4dc8
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
