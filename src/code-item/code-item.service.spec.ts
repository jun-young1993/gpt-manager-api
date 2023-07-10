import { Test, TestingModule } from '@nestjs/testing';
import { CodeItemService } from './code-item.service';

describe('CodeItemService', () => {
  let service: CodeItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodeItemService],
    }).compile();

    service = module.get<CodeItemService>(CodeItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
