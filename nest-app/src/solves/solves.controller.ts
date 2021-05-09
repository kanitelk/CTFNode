import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SolvesService } from './solves.service';
import { CreateSolveDto } from './dto/create-solve.dto';
import { UpdateSolveDto } from './dto/update-solve.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserRole } from '../schema/User.schema';
import { Role } from '../auth/roles.decorator';
import { JwtPayloadUser } from '../auth/auth.service';

@ApiTags('Solves')
@Controller('solves')
export class SolvesController {
  constructor(private readonly solvesService: SolvesService) {}

  @ApiOperation({ summary: 'Send solve for task' })
  @UseGuards(JwtAuthGuard)
  @Role(UserRole.USER, UserRole.ADMIN)
  @Post()
  create(@Req() req, @Body() solve: CreateSolveDto) {
    return this.solvesService.create(solve, (req.user as JwtPayloadUser)._id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solvesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSolveDto: UpdateSolveDto) {
    return this.solvesService.update(+id, updateSolveDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Role(UserRole.ADMIN)
  @Delete()
  remove(@Param('id') id: string) {
    return this.solvesService.remove(+id);
  }
}
