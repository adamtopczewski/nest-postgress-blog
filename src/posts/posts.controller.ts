import { Body, Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common';
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
        return this.postService.getAllPosts();
    }

    @Get(':id') 
    getPostById(@Param('id') id: string) {
        return this.postService.getPostById(Number(id));
    }

    @Post()
    async createPost(@Body() post: CreatePostDto) {
        return this.postService.createPost(post);
    }

    @Patch(':id')
    async updatePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
        return this.postService.updatePost(Number(id), post);
    }

    @Delete(':id')
    async deletePost(@Param('id') id: string) {
        this.postService.deletePost(Number(id));
    }
}
