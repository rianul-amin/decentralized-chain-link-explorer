import { Controller, Post, Body, Get, Param, Delete, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    return await this.commentsService.createComment(createCommentDto);
  }

  @Get()
  async getAllComments() {
    return await this.commentsService.getAllComments();
  }

  @Get(':id')
  async getCommentById(@Param('id') id: number) {
    return await this.commentsService.getCommentById(id);
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: number) {
    return await this.commentsService.deleteComment(id);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async updateComment(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto) {
    return await this.commentsService.updateComment(id, updateCommentDto);
  }

  @Get("/post/:id")
  async getAllCommentsByPostId(@Param('id') id: number) {
    return await this.commentsService.getAllCommentsByPostId(id);
  }
}
