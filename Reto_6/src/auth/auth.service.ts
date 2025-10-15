import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/create-auth.dto';
import bcrypt from "bcryptjs";
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ){
  }

  users = [
    {username:"jjzapata", password:"1234"},
    {username:"jjzapata1", password:"1234"},
    {username:"jjzapata2", password:"1234"}
  ]

  async login(loginDto: LoginDto) {
    console.log(loginDto);

    const user = await this.userService.findByUsername(loginDto.username);
    if(user &&  bcrypt.compareSync(loginDto.password, user.password)){ 
      const payload = {username:user.username, id:user.id, avatarUrl:user.avatarUrl}

      return {
        success:true,
        token: await this.jwtService.signAsync(payload)
      }
    }
    throw new NotFoundException('Usuario o contraseña incorrectos');
  }

}
