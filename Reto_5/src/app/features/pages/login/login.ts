import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../shared/services/auth';
import { User } from '../../../shared/interfaces/user';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {


  fb = inject(FormBuilder);

  router = inject(Router);

  authService = inject(Auth);

  ruta = '';

  title = 'Registro de usuario';

  validators = [Validators.required, Validators.minLength(4)];

  loginForm = this.fb.group({
    username:['jjzapata', [Validators.required]],
    password:['', this.validators]
  })


  onLogin(){
    if(!this.loginForm.valid){
      Swal.fire('Faltan campos por diligenciar');
      return;
    }

  
    let user = this.loginForm.value as User;
    let loginResponse = this.authService.login(user);
     if(!!loginResponse.success){
      Swal.fire('Ingreso exitoso');
      this.router.navigate([loginResponse.redirectTo]);
      return;
    }
    Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Ingreso fallido!"
});

  }

}
