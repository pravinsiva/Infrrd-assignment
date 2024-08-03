import { Component, ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppRoutingModule, CommonModule,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(private router: Router){
    this.router.navigateByUrl('/')
  }
}
