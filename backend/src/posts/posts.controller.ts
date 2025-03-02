import { Body, Controller, Post, Get, Param, Delete, Put, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto'; // Assuming you have a DTO for updating a post

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createNewPost(@Body() createPostDto: CreatePostDto) {
    return await this.postsService.createNewPost(createPostDto);
  }

  @Get()
  async getAllPosts() {
    return await this.postsService.getAllPosts();
  }

  @Get(':id')
  async getPostById(@Param('id') id: number) {
    return await this.postsService.getPostById(id);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: number) {
    return await this.postsService.deletePost(id);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async editPost(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    return await this.postsService.editPost(id, updatePostDto);
  }
}