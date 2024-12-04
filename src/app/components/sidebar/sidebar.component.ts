import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthUserService } from '../../services/auth-user.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private authService: AuthUserService) {}

  onLogout(): void {
    this.authService.logout();
  }
}
