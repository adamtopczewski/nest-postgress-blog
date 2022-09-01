import { Module } from '@nestjs/common';
import Post from './post.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import PostsController from './posts.controller';
import PostsService from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}