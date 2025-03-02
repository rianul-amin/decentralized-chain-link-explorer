import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { CommentEntity } from './comment.entity';
import { VoteEntity } from './vote.entity';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  postedOn: Date;

  @ManyToOne(() => UserEntity, user => user.posts, {nullable: true})
  user: UserEntity;

  @OneToMany(() => CommentEntity, comment => comment.post, {nullable: true})
  comments: CommentEntity[];

  @OneToMany(() => VoteEntity, vote => vote.post, {nullable: true})
  votes: VoteEntity[];

  @Column({default: false})
  isEdited: boolean
}
