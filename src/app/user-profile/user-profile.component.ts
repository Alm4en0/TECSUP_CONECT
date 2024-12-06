import { CommonModule } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../services/blog.service';
import { UserService } from '../services/user.service';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { SearchbarComponent } from '../components/searchbar/searchbar.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, SearchbarComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  activeTab: string = 'posts';
  allBlogs: any[] = [];
  filteredBlogs: any[] = [];

  constructor(private usersService: UserService) {}

  ngOnInit() {
    this.user = this.usersService.getUser();

    this.filterBlogs();
  }

  setTab(tab: string) {
    this.activeTab = tab;
    this.filterBlogs();
  }

  filterBlogs() {
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
