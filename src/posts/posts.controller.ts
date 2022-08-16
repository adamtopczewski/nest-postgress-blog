import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import PostsService from './posts.service';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';

@Controller('posts')
export default class PostsController {
    constructor(
        private readonly postService: PostsService
    ) {}

    @Get()
    getAllPosts() {
        this.postService.getAllPosts();
    }

    @Get(':id') 
    getPostById(@Param('id') id: string) {
        this.postService.getPostById(Number(id));
    }

    @Post()
    async createPost(@Body() post: CreatePostDto) {
        this.postService.createPost(post);
    }

    @Put(':id')
    async replacePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
        this.postService.replacePost(Number(id), post);
    }

    @Delete(':id')
    async deletePost(@Param('id') id: string) {
        this.postService.deletePost(Number(id));
    }
}
