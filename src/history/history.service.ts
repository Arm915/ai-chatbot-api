import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { History } from './schemas/history.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class HistoryService {
    constructor(@InjectModel(History.name) private model: Model<History>) { }

    async create(userId: string, question: string, answer: string) {
        return this.model.create({ userId: new Types.ObjectId(userId), question, answer });
    }

    async findByUser(userId: string) {
        return this.model.find({ userId }).sort({ createdAt: -1 });
    }

    async findAll() {
        return this.model.find().sort({ createdAt: -1 });
    }
}