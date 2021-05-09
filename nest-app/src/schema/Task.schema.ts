import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ default: false })
  visible: boolean;

  @Prop()
  tags: string[];

  @Prop()
  flag: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: string;

  @Prop({ default: 0 })
  score: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
