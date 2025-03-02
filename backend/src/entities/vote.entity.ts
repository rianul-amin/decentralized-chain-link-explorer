import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { PostEntity } from './post.entity';
import { CommentEntity } from './comment.entity';

@Entity('votes')
export class VoteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  voteType: number;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @ManyToOne(() => PostEntity, { nullable: true })
  post: PostEntity;

  @ManyToOne(() => CommentEntity, { nullable: true })
  comment: CommentEntity;
}
