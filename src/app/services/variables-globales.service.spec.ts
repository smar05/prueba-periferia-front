import { TestBed } from '@angular/core/testing';

import { VariablesGlobalesService } from './variables-globales.service';
import { EnumVariablesGlobales } from '../enums/EnumVariablesGlobales';

describe('VariablesGlobalesService', () => {
  let service: VariablesGlobalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariablesGlobalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setData', function () {
    const key = EnumVariablesGlobales.TITULO_NAVBAR;
    const initialValue = 'initial value';
    const updatedValue = 'updated value';

    service.setData(key, initialValue);
    service.setData(key, updatedValue);

    service.getData(key).subscribe((value) => {
      expect(value).toBe(updatedValue);
    });
  });
});
