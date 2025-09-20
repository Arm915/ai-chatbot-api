import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { History, HistorySchema } from './schemas/history.schema';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { TopicsModule } from '../topics/topics.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: History.name, schema: HistorySchema }]),
        forwardRef(() => TopicsModule),
    ],
    providers: [HistoryService],
    controllers: [HistoryController],
    exports: [HistoryService],
})
export class HistoryModule { }
