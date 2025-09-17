import { Component, inject, OnInit, signal } from '@angular/core';
import { Auth } from '../../../shared/services/auth';
import { UserService } from '../../../shared/services/user-service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {

  authService = inject(Auth);
  userService = inject(UserService);
  route = inject(ActivatedRoute);

  followers = 48;
  requests = 37;
  username = this.authService.getUserLogged().username;
  user = this.userService.getUser(this.username);
  galleryItems = signal([]);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['error'] === 'upload') {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Hubo un error al cargar la imagen',
          showConfirmButton: false,
          timer: 3000
        });
      }
    });

    /*
    const user = this.userService.getUser(this.username);
    if(user){
      this.galleryItems.set(user.gallery);
    }
    */
  }
}
