import { TestBed } from '@angular/core/testing';

import { AlertService } from './alert.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('basicAlert', function () {
    spyOn(Swal, 'fire');

    const title: string = 'Test Title';
    const text: string = 'Test Text';
    const icon: SweetAlertIcon = 'success';

    service.basicAlert(title, text, icon);

    expect(Swal.fire).toHaveBeenCalled();
  });
});
