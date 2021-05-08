import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsOptional()
  readonly email: string;

  @IsString()
  readonly login: string;

  @IsString()
  password: string;
}
