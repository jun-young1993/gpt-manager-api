import { Test, TestingModule } from '@nestjs/testing';
import { GoogleTrendsMappingService } from './google-trends-mapping.service';

describe('GoogleTrendsMappingService', () => {
  let service: GoogleTrendsMappingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleTrendsMappingService],
    }).compile();

    service = module.get<GoogleTrendsMappingService>(GoogleTrendsMappingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
