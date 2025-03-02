import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { MessageDTO } from './dto/message.dto';

@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {
  }

  afterInit(server: any) {

  }

  handleConnection(client: any, ...args: any[]) {
    this.chatService.increment_client_count();
    process.stdout.write(`Total connected: ${this.chatService.get_client_count()}\r`);
  }

  handleDisconnect(client: any) {
    this.chatService.decrement_client_count();
    process.stdout.write(`Total connected: ${this.chatService.get_client_count()}\r`);
  }

  @SubscribeMessage('message')
  async handleNew(client: any, data: any) {
    const data_ = JSON.parse(data) as MessageDTO
    await this.chatService.save_message(data_) 
    client.broadcast.emit('message', data)
  }
}
