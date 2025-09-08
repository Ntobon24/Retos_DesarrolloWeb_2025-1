import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUp {

  fb = inject(FormBuilder);

  ruta = '';

  title = 'Registro de usuario';

  private samePassword(passwordField: string, rePasswordField: string): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const Password = form.get(passwordField)?.value;
      const rePassword = form.get(rePasswordField)?.value;

      if (Password && rePassword && Password !== rePassword) {
        form.get(rePasswordField)?.setErrors({ notEqual: true });
        return { notEqual: true };
      }
      return null;
    };
  }

  validators = [Validators.required, Validators.minLength(4)];

  signUpForm = this.fb.group({
    username:['', [Validators.required]],
    email:['', [Validators.required]],
    password:['', this.validators],
    rePassword: ['', [Validators.required]],
    },
    {
      validators: this.samePassword('password', 'rePassword')
    }
  );

  onSignUp(){
    if(!this.signUpForm.valid){
      alert('Error en los campos por diligenciar');
      return;
    }
    let user = this.signUpForm.value;
    console.log(user);

    if(localStorage.getItem(user.username!)){
      alert('Usuario ya existe');
      return;
    }

    localStorage.setItem(user.username!, JSON.stringify(user));

  }

}
