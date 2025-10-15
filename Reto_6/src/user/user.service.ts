import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from "bcryptjs";

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private userRepository:Repository<User>){

  }

  users:User[] = [];

  async create(createUserDto: CreateUserDto) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(createUserDto.password, salt);

    try{
      const userEntity = this.userRepository.create({
        ...createUserDto,
        password:hash
      });
      await this.userRepository.save(userEntity);
      return {
      success:true,
      token:'fbsj4guw3wgjfwegjgyfhVJSFGKUFUGKS'
    };
    }catch(error){
      console.log(error);
      throw new BadRequestException('No se pudo crear el usuario');
    }

    /*this.users.push({
      ...createUserDto,
      id:uuidv4(),
      createdAt:new Date(),
      updatedAt:new Date(),
      isActive:true
    })*/
    
  }

  findAll() {
    return this.userRepository.find();
  }

  findByUsername(username: string) {
    //Esto tiene el mismo efecto
    //this.userRepository.findOneBy({id:id})
    return this.userRepository.findOneBy({username})
  }

  findOne(id: string) {
    //Esto tiene el mismo efecto
    //this.userRepository.findOneBy({id:id})
    return this.userRepository.findOneBy({id})
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    this.users.map(user=>{
      if(user.id===id){
        user.avatarUrl = updateUserDto.avatar||user.avatarUrl;
        user.name = updateUserDto.name||user.name;
        user.email = updateUserDto.email||user.email;
      }
    })
    return {
      success:true
    };
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
