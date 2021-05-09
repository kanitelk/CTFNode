import { IsString } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  title: string;

  @IsString()
  logo: string;

  @IsString()
  password: string;
}
