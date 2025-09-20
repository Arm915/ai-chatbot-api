import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../common/jwt.guard';
import { TopicsService } from './topics.service';
import { HistoryService } from '../history/history.service';

@Controller('topics')
@UseGuards(JwtGuard)
export class TopicsController {
    constructor(private topics: TopicsService, private histories: HistoryService) { }

    @Post()
    create(@Req() req: any, @Body() dto: { title: string; description?: string }) {
        return this.topics.create(req.user.userId, dto.title, dto.description);
    }

    @Get('mine')
    async mine(
        @Req() req: any,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        const p = Math.max(parseInt(page || '1', 10), 1);
        const l = Math.min(Math.max(parseInt(limit || '20', 10), 1), 100);
        return this.topics.findMyTopicsPaged(req.user.userId, p, l);
    }
}
