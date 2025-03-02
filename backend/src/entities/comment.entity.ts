import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { PostEntity } from './post.entity';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @ManyToOne(() => UserEntity, user => user.comments)
  user: UserEntity;

  @ManyToOne(() => PostEntity, post => post.comments)
  post: PostEntity;

  @ManyToOne(() => CommentEntity, { nullable: true })
  parentComment: CommentEntity;

  @Column({default: false})
  isEdited: boolean
}
