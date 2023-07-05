import { Test, TestingModule } from '@nestjs/testing';
import { GoogleTrendsMappingController } from './google-trends-mapping.controller';
import { GoogleTrendsMappingService } from './google-trends-mapping.service';

describe('GoogleTrendsMappingController', () => {
  let controller: GoogleTrendsMappingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoogleTrendsMappingController],
      providers: [GoogleTrendsMappingService],
    }).compile();

    controller = module.get<GoogleTrendsMappingController>(GoogleTrendsMappingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
