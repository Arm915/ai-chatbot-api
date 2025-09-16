import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtGuard } from '../common/jwt.guard';
import { HistoryService } from '../history/history.service';

@Controller('chat')
@UseGuards(JwtGuard)
export class ChatController {
    constructor(private chat: ChatService, private history: HistoryService) { }

    @Post()
    async chatWithAI(@Req() req: any, @Body() dto: { question: string }) {
        const answer = await this.chat.askLLM(dto.question);
        await this.history.create(req.user.userId, dto.question, answer);
        return { answer };
    }
}
