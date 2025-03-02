import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from 'src/entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
