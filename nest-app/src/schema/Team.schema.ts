import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type TeamDocument = Team & Document;

@Schema()
export class Team {
  @Prop({ required: true, unique: true, index: true })
  title: string;

  @Prop()
  logo: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  members: string[];

  @Prop()
  password: string;

  @Prop({ default: 0 })
  score: number;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
