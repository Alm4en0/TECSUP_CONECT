<<<<<<< HEAD
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthUserService } from '../../services/auth-user.service';
=======
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PublishButtonComponent } from "../../publish-button/publish-button.component";
>>>>>>> f7e00d106f1ed2ab2e89fb20306bd10d377a4dc8

@Component({
  selector: 'app-sidebar',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterModule],
=======
  imports: [RouterModule, CommonModule, FormsModule, PublishButtonComponent],
>>>>>>> f7e00d106f1ed2ab2e89fb20306bd10d377a4dc8
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

<<<<<<< HEAD
  constructor(private authService: AuthUserService) {}

  onLogout(): void {
    this.authService.logout();
  }
=======
>>>>>>> f7e00d106f1ed2ab2e89fb20306bd10d377a4dc8
}
