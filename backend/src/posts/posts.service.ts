import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from 'src/entities/post.entity';
import { UserEntity } from 'src/entities/user.entity';
import { CreatePostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity) private readonly postRepo: Repository<PostEntity>,
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
  ) {}

  async createNewPost(createPostDto: CreatePostDto) {
    const user = await this.userRepo.findOne({
        where: {
            id: createPostDto.userID
        }
    });

    const newPost = new PostEntity();
    newPost.content = createPostDto.content;
    newPost.title = createPostDto.title;
    newPost.user = user;

    try {
      return await this.postRepo.save(newPost);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getAllPosts() {
    return await this.postRepo.find();
  }

  async getPostById(id: number) {
    const post = await this.postRepo.findOne({
        where: {
            id
        }
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async deletePost(id: number) {
    const post = await this.postRepo.findOne({
        where: {
            id
        }
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return await this.postRepo.remove(post);
  }

  async editPost(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepo.findOne({
        where: {
            id
        }
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if(!post.user) throw new BadRequestException('Post cannot be deleted because this post has no owner')

    post.title = updatePostDto.title;
    post.content = updatePostDto.content;
    post.isEdited = true;

    try{
        await this.postRepo.save(post);
        return post;
    }
    catch(e){
        return new InternalServerErrorException(e)
    }
  }
}