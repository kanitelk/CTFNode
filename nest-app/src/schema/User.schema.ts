import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  SUSPENDED = 'SUSPENDED',
}

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true, index: true })
  login: string;

  @Prop({})
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: Object.values(UserRole) })
  role: UserRole;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Team' })
  team: string;

  @Prop({ default: 0 })
  score: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
