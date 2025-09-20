import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { History } from './schemas/history.schema';
import { isValidObjectId, Model, Types } from 'mongoose';

@Injectable()
export class HistoryService {
    constructor(@InjectModel(History.name) private model: Model<History>) { }

    create(topicId: string, question: string, answer: string) {
        return this.model.create({
            topicId: new Types.ObjectId(topicId),
            question,
            answer,
        });
    }

    async listByTopicAsc(topicId: string) {
        if (!isValidObjectId(topicId)) {
            throw new BadRequestException('Invalid topicId');
        }
        const _topicId = new Types.ObjectId(topicId);

        const rows = await this.model
            .find({ topicId: _topicId })
            .sort({ createdAt: 1 })
            .lean()
            .exec();
        return rows;
    }

    countByTopic(topicId: string) {
        return this.model.countDocuments({ topicId });
    }
}