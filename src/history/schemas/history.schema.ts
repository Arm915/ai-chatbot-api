import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class History extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', index: true }) userId: Types.ObjectId;
    @Prop() question: string;
    @Prop() answer: string;
}
export const HistorySchema = SchemaFactory.createForClass(History);
