// src/topics/topics.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Topic, TopicSchema } from './schemas/topic.schema';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { HistoryModule } from '../history/history.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Topic.name, schema: TopicSchema }]),
        forwardRef(() => HistoryModule),
    ],
    providers: [TopicsService],
    controllers: [TopicsController],
    exports: [TopicsService],
})
export class TopicsModule { }
