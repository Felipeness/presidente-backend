import { Test, TestingModule } from '@nestjs/testing';
import { VotarController } from './votar.controller';
import { VotarService } from './votar.service';

describe('VotarController', () => {
  let controller: VotarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VotarController],
      providers: [VotarService],
    }).compile();

    controller = module.get<VotarController>(VotarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
