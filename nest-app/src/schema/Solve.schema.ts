import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type SolveDocument = Solve & Document;

@Schema()
export class Solve {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true })
  task: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: false })
  team?: string;

  @Prop({ required: true })
  value: string;

  @Prop({ required: true, default: 0 })
  score: number;

  @Prop({ required: true, default: false })
  correct: boolean;
}

export const SolveSchema = SchemaFactory.createForClass(Solve);
