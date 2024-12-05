import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserPostsComponent } from '../user-posts/user-posts.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { SearchbarComponent } from '../components/searchbar/searchbar.component';
import { PublishButtonComponent } from '../publish-button/publish-button.component';
import { UserProfileSService } from '../services/user-profile-s.service';
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UserPostsComponent,
    SidebarComponent,
    SearchbarComponent,
    PublishButtonComponent,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  activeTab: string = 'posts'; // 'posts' o 'saved'
  allBlogs: any[] = [];
  filteredBlogs: any[] = [];

  constructor(private usersService: UserProfileSService) {}

  ngOnInit() {
    // Obtener datos del usuario actual
    this.user = this.usersService.getUser('Jane Doe'); // Cambia 'Jane Doe' según el usuario actual

    // Obtener todos los blogs desde el servicio
    const blogData = this.usersService.getBlogs();
    this.allBlogs = blogData.blogs;

    // Aplicar el filtro inicial
    this.filterBlogs();
  }

  setTab(tab: string) {
    this.activeTab = tab; // Cambia la pestaña activa
    this.filterBlogs(); // Filtra los blogs según la pestaña activa
  }

  filterBlogs() {
    // Filtrar blogs según la pestaña activa
    if (this.activeTab === 'posts') {
      this.filteredBlogs = this.allBlogs.filter(
        (blog) => blog.user.name === this.user.name
      );
    } else if (this.activeTab === 'saved') {
      this.filteredBlogs = this.allBlogs.filter(
        (blog) => blog.savedBy === this.user.name
      );
    }
  }
}
