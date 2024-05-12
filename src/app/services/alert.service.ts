import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  /**
   * Modal de alerta
   *
   * @param {string} title
   * @param {string} text
   * @param {SweetAlertIcon} icon
   * @memberof AlertService
   */
  public basicAlert(title: string, text: string, icon: SweetAlertIcon): void {
    Swal.fire({
      title,
      text,
      icon,
    });
  }
}
