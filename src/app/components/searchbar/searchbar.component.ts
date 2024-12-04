<<<<<<< HEAD
import { Component } from '@angular/core';
=======
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PublishButtonComponent } from "../../publish-button/publish-button.component";
>>>>>>> f7e00d106f1ed2ab2e89fb20306bd10d377a4dc8

@Component({
  selector: 'app-searchbar',
  standalone: true,
<<<<<<< HEAD
  imports: [],
=======
  imports: [FormsModule, CommonModule, PublishButtonComponent],
>>>>>>> f7e00d106f1ed2ab2e89fb20306bd10d377a4dc8
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent {

}
