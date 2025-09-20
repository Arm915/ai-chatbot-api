import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Topic } from './schemas/topic.schema';
import { isValidObjectId, Model, Types } from 'mongoose';

@Injectable()
export class TopicsService {
    constructor(@InjectModel(Topic.name) private model: Model<Topic>) { }

    create(userId: string, title: string, description?: string) {
        return this.model.create({
            userId: new Types.ObjectId(userId),
            title,
            description,
            lastAskedAt: new Date(),
        });
    }

    async findMyTopicsPaged(userId: string, page = 1, limit = 20) {
        const query = { userId: new Types.ObjectId(userId) };
        const total = await this.model.countDocuments(query);
        const items = await this.model
            .find(query)
            .sort({ lastAskedAt: -1, _id: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        const hasMore = page * limit < total;
        return { items, total, page, limit, hasMore };
    }

    async ensureOwned(topicId: string, userId: string) {
        if (!isValidObjectId(topicId) || !isValidObjectId(userId)) {
            throw new BadRequestException('Invalid id format');
        }
        const _id = new Types.ObjectId(topicId);
        const _userId = new Types.ObjectId(userId);
        const t = await this.model.findOne({ _id, userId: _userId });
        if (!t) throw new NotFoundException('Topic not found');
        return t;
    }

    async touch(topicId: string) {
        await this.model.updateOne({ _id: topicId }, { $set: { lastAskedAt: new Date() } });
    }
}
