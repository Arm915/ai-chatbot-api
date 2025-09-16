import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { HistoryModule } from '../history/history.module';

@Module({
    imports: [HistoryModule],
    controllers: [ChatController],
    providers: [ChatService],
})
export class ChatModule { }