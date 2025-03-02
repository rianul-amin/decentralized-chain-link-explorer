import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from 'src/entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UserEntity } from 'src/entities/user.entity';
import { PostEntity } from 'src/entities/post.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(PostEntity) private readonly postRepo: Repository<PostEntity>,
    @InjectRepository(CommentEntity) private readonly commentRepo: Repository<CommentEntity>,

  ) {}

  async createComment(createCommentDto: CreateCommentDto) {
    const { content, userID, postID } = createCommentDto;

    const user = await this.userRepo.findOne({
        where: {
            id: createCommentDto.userID
        }
    });


    const post = await this.postRepo.findOne({
        where: {
            id: createCommentDto.postID
        }
    });

    if(!post) return new NotFoundException('Post does not exist.')


    const newComment = new CommentEntity();
    newComment.content = content;
    newComment.user = user;
    newComment.post = post;

    try {
      return await this.commentRepo.save(newComment);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create comment');
    }
  }

  async getAllComments() {
    return await this.commentRepo.find();
  }

  async getCommentById(id: number) {
    const comment = await this.commentRepo.findOne({
        where: {
            id
        }
    });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async deleteComment(id: number) {
    const comment = await this.commentRepo.findOne({
        where: {
            id
        }
    });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return await this.commentRepo.remove(comment);
  }

  async updateComment(id: number, updateCommentDto: UpdateCommentDto) {
    const { content } = updateCommentDto;
    const comment = await this.commentRepo.findOne({
        where: {
            id
        }
    });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if(!comment.user) throw new BadRequestException('Comment cannot be deleted because this comment has no owner')

    comment.content = content;
    comment.isEdited = true;
    try {
      return await this.commentRepo.save(comment);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update comment');
    }
  }

  async getAllCommentsByPostId(postId: number) {
    const post = await this.postRepo.findOne({
        where:{
            id: postId
        },
        relations: ['comments']
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post.comments;
  }
}
