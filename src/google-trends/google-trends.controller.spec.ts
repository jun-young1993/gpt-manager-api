import { Test, TestingModule } from '@nestjs/testing';
import { GoogleTrendsController } from './google-trends.controller';
import { GoogleTrendsService } from './google-trends.service';

describe('GoogleTrendsController', () => {
  let controller: GoogleTrendsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoogleTrendsController],
      providers: [GoogleTrendsService],
    }).compile();

    controller = module.get<GoogleTrendsController>(GoogleTrendsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
