import { Test, TestingModule } from '@nestjs/testing';
import { VotarService } from './votar.service';

describe('VotarService', () => {
  let service: VotarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VotarService],
    }).compile();

    service = module.get<VotarService>(VotarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
