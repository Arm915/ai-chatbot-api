import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ unique: true, required: true }) email: string;
    @Prop({ required: true }) password: string;
    @Prop() name?: string;
    @Prop({ default: 'user', enum: ['user', 'admin'] }) role: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
