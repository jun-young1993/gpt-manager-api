import { Test, TestingModule } from '@nestjs/testing';
import { CodeItemController } from './code-item.controller';
import { CodeItemService } from './code-item.service';

describe('CodeItemController', () => {
  let controller: CodeItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodeItemController],
      providers: [CodeItemService],
    }).compile();

    controller = module.get<CodeItemController>(CodeItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
