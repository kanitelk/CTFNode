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
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserRole } from '../schema/User.schema';
import { Role } from '../auth/roles.decorator';
import { JwtPayloadUser } from '../auth/auth.service';

@ApiTags('Teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @ApiOperation({ summary: 'Create new team' })
  @ApiCreatedResponse()
  @UseGuards(JwtAuthGuard)
  @Role(UserRole.USER, UserRole.ADMIN)
  @Post()
  create(@Req() req, @Body() createTeamDto: CreateTeamDto) {
    const { _id, role } = req.user as JwtPayloadUser;
    return this.teamsService.create(createTeamDto, _id, role);
  }

  @ApiOperation({ summary: 'Join team' })
  @UseGuards(JwtAuthGuard)
  @Role(UserRole.USER)
  @Post(':id/join')
  join(@Req() req, @Body() createTeamDto: CreateTeamDto) {
    // join team
  }

  @ApiOperation({ summary: 'Leave team' })
  @UseGuards(JwtAuthGuard)
  @Role(UserRole.USER)
  @Post(':id/leave')
  leave(@Req() req, @Body() createTeamDto: CreateTeamDto) {
    // leave team
  }

  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update team data' })
  @UseGuards(JwtAuthGuard)
  @Role(UserRole.USER, UserRole.ADMIN)
  @Patch(':id')
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateTeamDto: UpdateTeamDto,
  ) {
    const { _id, role } = req.user as JwtPayloadUser;
    return this.teamsService.update(id, updateTeamDto, _id, role);
  }

  @ApiOperation({ summary: 'Delete team' })
  @UseGuards(JwtAuthGuard)
  @Role(UserRole.USER, UserRole.ADMIN)
  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    const { _id, role } = req.user as JwtPayloadUser;
    return this.teamsService.remove(id, _id, role);
  }
}
