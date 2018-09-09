/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TermsService } from './Terms.service';

describe('Service: Terms', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TermsService]
    });
  });

  it('should ...', inject([TermsService], (service: TermsService) => {
    expect(service).toBeTruthy();
  }));
});
