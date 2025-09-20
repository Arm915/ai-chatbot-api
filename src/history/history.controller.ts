// src/histories/histories.controller.ts
import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../common/jwt.guard';
import { HistoryService } from './history.service';
import { TopicsService } from '../topics/topics.service';

@Controller('histories')
@UseGuards(JwtGuard)
export class HistoryController {
    constructor(private histories: HistoryService, private topics: TopicsService) { }

    @Post()
    async add(@Req() req: any, @Body() dto: { topicId: string; question: string; answer: string }) {
        await this.topics.ensureOwned(dto.topicId, req.user.userId);

        const h = await this.histories.create(dto.topicId, dto.question, dto.answer);
        await this.topics.touch(dto.topicId);
        return h;
    }

    @Get('/by-topic/:topicId')
    async list(@Req() req: any, @Param('topicId') topicId: string) {
        await this.topics.ensureOwned(topicId, req.user.userId);   
        return this.histories.listByTopicAsc(topicId);
    }
}
