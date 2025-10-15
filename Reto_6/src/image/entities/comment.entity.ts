import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Image } from "./image.entity";
import { User } from "src/user/entities/user.entity";

@Entity('comments')
export class Comment{

    @PrimaryGeneratedColumn('uuid')
    id:string;


    @ManyToOne(()=>User, user=>user.comments)
    user:User;
    
    @ManyToOne(() =>Image, image=>image.comments)
    image:Image;
    
    @Column({type:'varchar'})
    message:string;

    @CreateDateColumn({name:'created_at'})
    createdAt: Date;
}