import { Module } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from 'src/entities/post.entity';
import { UserEntity } from 'src/entities/user.entity';
import { VoteEntity } from 'src/entities/vote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity, VoteEntity])],
  controllers: [VotesController],
  providers: [VotesService],
})
export class VotesModule {}
