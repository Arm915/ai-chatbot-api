import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Topic extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', index: true })
    userId: Types.ObjectId;

    @Prop({ required: true })
    title: string;

    @Prop()
    description?: string;

    @Prop({ type: Date, index: true })
    lastAskedAt?: Date;
}
export const TopicSchema = SchemaFactory.createForClass(Topic);
TopicSchema.index({ userId: 1, lastAskedAt: -1 });
