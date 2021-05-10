import { IsString } from 'class-validator';

export class JoinTeamDto {
  @IsString()
  password: string;
}
