import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { HistoryModule } from '../history/history.module';
import { TopicsModule } from '../topics/topics.module';

@Module({
    imports: [
        HistoryModule,
        TopicsModule,
    ],
    controllers: [ChatController],
    providers: [ChatService],
    exports: [ChatService],
})
export class ChatModule { }