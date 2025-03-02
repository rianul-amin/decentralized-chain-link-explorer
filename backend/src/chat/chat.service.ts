import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from 'src/entities/message.entity';
import { Repository } from 'typeorm';
import { MessageDTO } from './dto/message.dto';

@Injectable()
export class ChatService {
    private client_count = 0
    constructor(@InjectRepository(MessageEntity) private readonly messageRepo: Repository<MessageEntity>) {}

    increment_client_count() {
        this.client_count++
    }

    decrement_client_count() {
        this.client_count--
    }

    get_client_count() {
        return this.client_count
    }

    async save_message(messageDto: MessageDTO) {
        const {sender, message} = messageDto
        //console.log(`sender: ${sender} | Message: ${message}`)
        await this.messageRepo.save({sender, message})
    }
}
