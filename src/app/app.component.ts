import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { HeaderComponent } from './component/layout/header/header.component';
import { FooterComponent } from './component/layout/footer/footer.component';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './component/auth/auth.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {



}
