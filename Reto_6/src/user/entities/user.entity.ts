import { Image } from "src/image/entities/image.entity";
import { Comment } from "src/image/entities/comment.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
export class User {


    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column({unique:true})
    username:string;
    @Column({type:'varchar'})
    password:string;
    @Column({type:'varchar', nullable:true})
    name:string;
    @Column({type:'varchar', nullable:true})
    email:string;
    @Column({name:'avatar_url', type:'varchar', nullable:true})
    avatarUrl?:string;
    @CreateDateColumn({name:'created_at'})
    createdAt: Date;
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;
    @Column({ name:'is_active', default: 'true' })
    isActive: boolean;

    @OneToMany(()=>Image, image=>image.user)
    gallery:Image[];

    @OneToMany(()=>Comment, comment=>comment.user)
    comments:Comment[];

   @BeforeInsert()
    preCreate(){
        this.name = this.name.toLowerCase();

    }
}
