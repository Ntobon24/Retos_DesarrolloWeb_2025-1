import { Injectable } from '@nestjs/common';
import { UploadImageDto } from './dto/upload-image.dto';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddComment } from './dto/add-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class ImageService {

  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>
  ) { }

  uploadImage(uploadImageDto: UploadImageDto) {
    let imageEntity = this.imageRepository.create({ ...uploadImageDto, user: { id: uploadImageDto.userId } })
    return this.imageRepository.save(imageEntity);
  }

  addComment(comment: AddComment) {
    let commentEntity = this.commentRepository.create(
      {
        ...comment,
        user: { id: comment.userId },
        image: { id: comment.imageId }
      }
    )
    return this.commentRepository.save(commentEntity);
  }

  getGalleryByUserId(userId: string, page:number=1, pageSize:number=100) {
    /*return this.imageRepository.findBy(
      {user:{id:userId}}
    )*/
    let skip = (page - 1) * pageSize;

    console.log({skip, page, pageSize})

    return this.imageRepository.find({
      /*where:[
        {user:{id:userId}},
        {user:{isActive:true}}
      ],*/
      where: {
        user: { id: userId, isActive: true }
      },
      relations: {
        comments: true,
        user: true
      },
      select: {
        id: true,
        url: true,
        createdAt: true,
        comments: true,
        user: {
          id: true,
          username: true,
        }
      },
      order: {
        createdAt: 'DESC',
        comments: {
          createdAt: 'DESC'
        }
      },
      skip,
      take: pageSize
    })
  }

}
