import { Module } from '@nestjs/common';
import { SolvesService } from './solves.service';
import { SolvesController } from './solves.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Solve, SolveSchema } from '../schema/Solve.schema';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { TasksModule } from '../tasks/tasks.module';
import { User, UserSchema } from '../schema/User.schema';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TasksModule,
    MongooseModule.forFeature([
      { name: Solve.name, schema: SolveSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [SolvesController],
  providers: [SolvesService],
})
export class SolvesModule {}
