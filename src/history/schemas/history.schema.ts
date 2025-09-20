import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class History extends Document {
    @Prop({ type: Types.ObjectId, ref: 'Topic', index: true })
    topicId: Types.ObjectId;

    @Prop({ required: true })
    question: string;

    @Prop({ required: true })
    answer: string;
}

export const HistorySchema = SchemaFactory.createForClass(History);
HistorySchema.index({ topicId: 1, createdAt: 1 });
