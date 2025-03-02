import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from 'src/entities/post.entity';
import { VoteEntity } from 'src/entities/vote.entity';
import { UserEntity } from 'src/entities/user.entity';
import { CreateVoteDto } from './dto/create-vote.dto';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(VoteEntity) private readonly voteRepository: Repository<VoteEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getVoteCountByPostId(postId: number) {
    const post: PostEntity = await this.postRepository.findOne({
        where: {
            id: postId
        },
        relations: ['votes']
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    let voteWeight = 0;
    for(let vote of post.votes) {
        if(vote.voteType == 1) voteWeight++
        else voteWeight--
    }

    return {
      postId: post.id,
      vote: voteWeight
    };
  }

  async createVote(createVoteDto: CreateVoteDto) {
    const { userID, postID, value } = createVoteDto;

    const user = await this.userRepository.findOne({
        where: {
            id: userID
        }
    });

    const post = await this.postRepository.findOne({
        where: {
            id: postID
        }
    });

    if(!post) return new NotFoundException('Post does not exist.')

    const newVote = new VoteEntity();
    newVote.voteType = value
    newVote.post = post
    newVote.user = user

    return await this.voteRepository.save(newVote);
  }

  async deleteVote(id: number) {
    const vote = await this.voteRepository.findOne({
        where: {
            id
        }
    });
    if (!vote) {
      throw new NotFoundException('Vote not found');
    }
    return await this.voteRepository.remove(vote);
  }
}
