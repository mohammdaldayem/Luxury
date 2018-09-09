/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdvertismentService } from './Advertisment.service';

describe('Service: Advertisment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdvertismentService]
    });
  });

  it('should ...', inject([AdvertismentService], (service: AdvertismentService) => {
    expect(service).toBeTruthy();
  }));
});
