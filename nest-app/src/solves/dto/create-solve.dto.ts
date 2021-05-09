import { IsString } from 'class-validator';

export class CreateSolveDto {
  @IsString()
  task: string;

  @IsString()
  value: string;
}
