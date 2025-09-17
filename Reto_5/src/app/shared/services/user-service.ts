import { Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user = signal<User | null>(null);


  saveImage(username: string, url:string){
    let userString = localStorage.getItem(username)
    if(userString){
      let user = JSON.parse(userString);
      user.gallery.push(url);
      console.log(user)
      localStorage.setItem(username, JSON.stringify(user));
    }

  }

  getUser(username:string){
    let userString = localStorage.getItem(username)
    if(userString){
      this.user.set(JSON.parse(userString) as User)
      return this.user;
    }else{
      throw new Error('User not found');
    }
  
  }
  
}
