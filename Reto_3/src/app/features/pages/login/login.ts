import { Component , inject } from '@angular/core';
import { RouterLink, Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  fb = inject(FormBuilder);
  router = inject(Router);

  loginForm = this.fb.group({
    username:['', [Validators.required]],
    password:['', [Validators.required]],
  })

  onLogin(){
    if(!this.loginForm.valid){
      alert('Faltan campos por diligenciar');
      return;
    }

    let user = this.loginForm.value;
    console.log(user);
    
    let userData = localStorage.getItem(user.username!);
    
    if(!userData){
      alert('Verifica el nombre de usuario y la contraseña');
      return;
    }
    
      let storedUser = JSON.parse(userData);

      if(storedUser.password === user.password){
        alert('Inicio de sesión exitoso');
        this.router.navigate(['/home']);
      } else {
        alert('Verifica el nombre de usuario y la contraseña');
      }
  }
}

