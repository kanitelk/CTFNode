import { IsInt, IsOptional, IsString, Length, Min } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsInt()
  @Min(0)
  score: number;

  @IsString()
  @Length(1, 100)
  flag: string;

  @IsOptional()
  @IsString({
    each: true,
  })
  tags?: string[];
}
