/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SellerService } from './Seller.service';

describe('Service: Seller', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SellerService]
    });
  });

  it('should ...', inject([SellerService], (service: SellerService) => {
    expect(service).toBeTruthy();
  }));
});
