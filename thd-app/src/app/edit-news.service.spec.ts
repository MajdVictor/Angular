import { TestBed } from '@angular/core/testing';

import { EditNewsService } from './edit-news.service';

describe('EditNewsService', () => {
  let service: EditNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
