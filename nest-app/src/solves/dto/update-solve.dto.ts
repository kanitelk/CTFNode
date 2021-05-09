import { PartialType } from '@nestjs/swagger';
import { CreateSolveDto } from './create-solve.dto';

export class UpdateSolveDto extends PartialType(CreateSolveDto) {}
