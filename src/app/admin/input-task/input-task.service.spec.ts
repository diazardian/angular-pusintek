import { TestBed } from '@angular/core/testing';

import { InputTaskService } from './input-task.service';

describe('InputTaskService', () => {
  let service: InputTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
