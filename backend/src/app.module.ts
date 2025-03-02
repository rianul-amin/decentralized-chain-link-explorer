import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { VotesModule } from './votes/votes.module';
import config from 'ormconfig';

@Module({
  imports: [ChatModule, TypeOrmModule.forRoot(config), UsersModule, PostsModule, CommentsModule, VotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
