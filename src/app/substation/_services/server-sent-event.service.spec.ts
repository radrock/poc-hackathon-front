import { TestBed } from '@angular/core/testing';

import { ServerSentEventService } from './server-sent-event.service';

describe('ServerSentEventService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerSentEventService = TestBed.get(ServerSentEventService);
    expect(service).toBeTruthy();
  });
});
