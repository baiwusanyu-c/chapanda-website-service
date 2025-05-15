import { Test, TestingModule } from '@nestjs/testing';
import { OperationCenterController } from './operation-center.controller';
import { OperationCenterService } from './operation-center.service';

describe('OperationCenterController', () => {
  let controller: OperationCenterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperationCenterController],
      providers: [OperationCenterService],
    }).compile();

    controller = module.get<OperationCenterController>(
      OperationCenterController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
