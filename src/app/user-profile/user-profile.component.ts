import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../services/blog.service';
import { UserBlogsComponent } from '../user-blogs/user-blogs.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, UserBlogsComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  user = {
    name: 'Jane Doe',
    profileImage: 'https://via.placeholder.com/150',
    cycle: '6to',
    career: 'Ingeniería de Software',
  };

  activeTab: string = 'posts'; // 'posts' o 'saved'
  allBlogs: any[] = [];
  filteredBlogs: any[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    // Obtener todos los blogs del servicio
    const blogData = this.blogService.getBlogs(); // Obtén el objeto completo con blogs y totalBlogs
    this.allBlogs = blogData.blogs; // Accede solo a la propiedad blogs
    this.filterBlogs(); // Aplica el filtro inicial
  }

  setTab(tab: string) {
    this.activeTab = tab; // Cambia la pestaña activa
    this.filterBlogs(); // Filtra los blogs cada vez que se cambia de pestaña
  }

  filterBlogs() {
    // Filtra los blogs según la pestaña activa y el usuario
    if (this.activeTab === 'posts') {
      this.filteredBlogs = this.allBlogs.filter((blog) => blog.user.name === this.user.name);
    } else if (this.activeTab === 'saved') {
      // Lógica para los blogs guardados, si fuera necesario
      this.filteredBlogs = this.allBlogs.filter((blog) => blog.savedBy && blog.savedBy === this.user.name);
    }
  }
}
