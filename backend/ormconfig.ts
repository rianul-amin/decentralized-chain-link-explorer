
import { CommentEntity } from 'src/entities/comment.entity';
import { MessageEntity } from 'src/entities/message.entity';
import { PostEntity } from 'src/entities/post.entity';
import { UserEntity } from 'src/entities/user.entity';
import { VoteEntity } from 'src/entities/vote.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'DCL-Explorer',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgre',
  entities: [MessageEntity, PostEntity, CommentEntity, UserEntity, VoteEntity],
  synchronize: true,
};

export default config;