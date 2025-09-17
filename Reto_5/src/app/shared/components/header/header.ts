import { Component, inject, signal } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  private authService = inject(Auth);
  router = inject(Router);

  isLogged = this.authService.isLogged;

  onLogout(){
    this.authService.logout();
    this.router.navigateByUrl('');


  }


}
