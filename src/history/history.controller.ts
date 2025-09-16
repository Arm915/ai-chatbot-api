import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { HistoryService } from './history.service';
import { JwtGuard } from '../common/jwt.guard';

@Controller('history')
@UseGuards(JwtGuard)
export class HistoryController {
    constructor(private history: HistoryService) { }

    @Get('me')
    myHistory(@Req() req: any) {
        return this.history.findByUser(req.user.userId);
    }

    @Get('all') // ใช้เป็นหน้า admin (คุณจะเพิ่ม role guard ภายหลังก็ได้)
    all() {
        return this.history.findAll();
    }
}