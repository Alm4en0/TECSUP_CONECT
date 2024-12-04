import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../services/blog.service';
import { UserBlogsComponent } from '../user-blogs/user-blogs.component';
=======
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../services/blog.service';
import { UserBlogsComponent } from '../user-blogs/user-blogs.component';
import { UsersService } from '../services/users.service';
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { SearchbarComponent } from "../components/searchbar/searchbar.component";
>>>>>>> f7e00d106f1ed2ab2e89fb20306bd10d377a4dc8

@Component({
  selector: 'app-user-profile',
  standalone: true,
<<<<<<< HEAD
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

=======
  imports: [CommonModule, FormsModule, UserBlogsComponent, SidebarComponent, SearchbarComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  user: any = {};
>>>>>>> f7e00d106f1ed2ab2e89fb20306bd10d377a4dc8
  activeTab: string = 'posts'; // 'posts' o 'saved'
  allBlogs: any[] = [];
  filteredBlogs: any[] = [];

<<<<<<< HEAD
  constructor(private blogService: BlogService) {}

  ngOnInit() {
    // Obtener todos los blogs del servicio
    const blogData = this.blogService.getBlogs(); // Obtén el objeto completo con blogs y totalBlogs
    this.allBlogs = blogData.blogs; // Accede solo a la propiedad blogs
    this.filterBlogs(); // Aplica el filtro inicial
=======
  constructor(private usersService: UsersService) {}

  ngOnInit() {
    // Obtener datos del usuario actual
    this.user = this.usersService.getUser('Jane Doe'); // Cambia 'Jane Doe' según el usuario actual

    // Obtener todos los blogs desde el servicio
    const blogData = this.usersService.getBlogs();
    this.allBlogs = blogData.blogs;

    // Aplicar el filtro inicial
    this.filterBlogs();
>>>>>>> f7e00d106f1ed2ab2e89fb20306bd10d377a4dc8
  }

  setTab(tab: string) {
    this.activeTab = tab; // Cambia la pestaña activa
<<<<<<< HEAD
    this.filterBlogs(); // Filtra los blogs cada vez que se cambia de pestaña
  }

  filterBlogs() {
    // Filtra los blogs según la pestaña activa y el usuario
    if (this.activeTab === 'posts') {
      this.filteredBlogs = this.allBlogs.filter((blog) => blog.user.name === this.user.name);
    } else if (this.activeTab === 'saved') {
      // Lógica para los blogs guardados, si fuera necesario
      this.filteredBlogs = this.allBlogs.filter((blog) => blog.savedBy && blog.savedBy === this.user.name);
=======
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
>>>>>>> f7e00d106f1ed2ab2e89fb20306bd10d377a4dc8
    }
  }
}
