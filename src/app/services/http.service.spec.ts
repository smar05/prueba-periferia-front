import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('HttpService', () => {
  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get', function () {
    const url = 'https://example.com/api';
    const params = { param1: 'value1', param2: 'value2' };
    const expectedResponse = { data: 'response data' };
    const httpSpy = spyOn(service['http'], 'get').and.returnValue(
      of(expectedResponse)
    );

    const result = service.get(url, params);

    result.subscribe((res) => {
      expect(httpSpy).toHaveBeenCalledWith(url, { params });
      expect(res).toEqual(expectedResponse);
    });
  });

  it('get - params no', function () {
    const url = 'https://example.com/api';
    const expectedResponse = { data: 'response data' };
    const httpSpy = spyOn(service['http'], 'get').and.returnValue(
      of(expectedResponse)
    );
    const params = {};

    const result = service.get(url);

    result.subscribe((res) => {
      expect(httpSpy).toHaveBeenCalledWith(url, { params });
      expect(res).toEqual(expectedResponse);
    });
  });
});
