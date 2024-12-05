import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PublishButtonComponent } from '../../publish-button/publish-button.component';
import { AuthUserService } from '../../services/auth-user.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, PublishButtonComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(private authService: AuthUserService) {}

  onLogout(): void {
    this.authService.logout();
  }
}
