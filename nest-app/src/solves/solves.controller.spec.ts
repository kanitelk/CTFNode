import { Test, TestingModule } from '@nestjs/testing';
import { SolvesController } from './solves.controller';
import { SolvesService } from './solves.service';

describe('SolvesController', () => {
  let controller: SolvesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolvesController],
      providers: [SolvesService],
    }).compile();

    controller = module.get<SolvesController>(SolvesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
