import { Test, TestingModule } from '@nestjs/testing';
import { OperationCenterService } from './operation-center.service';

describe('OperationCenterService', () => {
  let service: OperationCenterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperationCenterService],
    }).compile();

    service = module.get<OperationCenterService>(OperationCenterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
