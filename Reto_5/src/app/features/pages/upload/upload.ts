import { Component, inject } from '@angular/core';
import { Storage } from '../../../shared/services/storage';
import { Auth } from '../../../shared/services/auth';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { UserService } from '../../../shared/services/user-service';

@Component({
  selector: 'app-upload',
  imports: [],
  templateUrl: './upload.html',
  styleUrl: './upload.css'
})
export class Upload {

  storageService = inject(Storage);
  authService = inject(Auth);
  userService = inject(UserService);
  router = inject(Router);


   onUploadImage(event: Event) {
    const inputFile = event.target as HTMLInputElement;
    if (!inputFile.files || inputFile.files.length === 0) {
      return;
    }

    const imageFile = inputFile.files[0];
    const username = this.authService.getUserLogged().username;

    Swal.fire({
      toast: true,
      position: "top-end",
      title: "Subiendo imagen...",
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: () => { Swal.showLoading(); }
    });

    this.storageService.uploadFile(imageFile, username)
      .then(response => {
        Swal.close();

        if (response && response.data) {
          const url = this.storageService.getImageUrl(response.data.fullPath);
          this.userService.saveImage(username, url);

          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Imagen cargada con éxito',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            this.router.navigate(['/home']);
          });

        } else {
          this.router.navigate(['/home'], { queryParams: { error: 'upload' } });
        }
      })
      .catch(() => {
        Swal.close();
        this.router.navigate(['/home'], { queryParams: { error: 'upload' } });
      });
  }

}
