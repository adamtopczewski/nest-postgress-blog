import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';
import Post from './post.entity';


@Injectable()
export default class PostsService {
    constructor(
        @InjectRepository(Post) 
        private postRepository: Repository<Post> 
    ) {}

    getAllPosts() {
        return this.postRepository.find();
    }

    async getPostById(id: number) {
        const post = await this.postRepository.findOneBy({id: id});
        if(post) {
            return post;
        }
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND)
    }

    async createPost(post: CreatePostDto) {
        const newPost = await this.postRepository.create(post);
        await this.postRepository.save(newPost)
        return newPost; 
    }

    async updatePost(id: number, post: UpdatePostDto) {
        await this.postRepository.update(id, post);
        const updatedPost = await this.postRepository.findOneBy({id: id});
        if(updatedPost) {
            return updatedPost
        }
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    async deletePost(id: number) {
        const deleteResponse = await this.postRepository.delete(id);
        if(!deleteResponse.affected) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
    }
}
