// src/chat/chat.controller.ts
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../common/jwt.guard';
import { ChatService } from './chat.service';
import { TopicsService } from '../topics/topics.service';
import { HistoryService } from '../history/history.service';
import { isValidObjectId } from 'mongoose';

type ChatDto = {
    topicId?: string;     // อาจว่างในแชทแรก
    title?: string;       // ให้ตั้งชื่อหัวข้อเองได้ (ถ้าไม่ใส่จะ auto จากคำถาม)
    question: string;
};

@Controller('chat')
@UseGuards(JwtGuard)
export class ChatController {
    constructor(
        private chat: ChatService,
        private topics: TopicsService,
        private history: HistoryService,
    ) { }

    @Post()
    async chatWithAI(@Req() req: any, @Body() dto: ChatDto) {
        let topicId = dto.topicId?.trim();
        if (!topicId || !isValidObjectId(topicId)) {
            const title = (dto.question || 'New Topic').slice(0, 60);
            const topic = await this.topics.create(req.user.userId, title);
            topicId = String((topic as any)._id);
        } else {
            await this.topics.ensureOwned(topicId, req.user.userId);
        }
        const answer = await this.chat.askGemini(dto.question);
        await this.history.create(topicId, dto.question, answer);
        
        await this.topics.touch(topicId);
        return { topicId, answer };
    }
}
