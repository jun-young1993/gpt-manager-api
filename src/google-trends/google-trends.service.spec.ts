import { Test, TestingModule } from '@nestjs/testing';
import { GoogleTrendsService } from './google-trends.service';

describe('GoogleTrendsService', () => {
  let service: GoogleTrendsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleTrendsService],
    }).compile();

    service = module.get<GoogleTrendsService>(GoogleTrendsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
