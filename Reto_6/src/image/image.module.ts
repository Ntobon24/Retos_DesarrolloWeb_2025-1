import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Comment } from './entities/comment.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Image, Comment])],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
