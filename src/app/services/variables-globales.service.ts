import { Injectable } from '@angular/core';
import { EnumVariablesGlobales } from '../enums/EnumVariablesGlobales';
import { BehaviorSubject, Observable, OperatorFunction, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VariablesGlobalesService {
  private dataSubject = new BehaviorSubject<any>({});

  /**
   * Asignar datos
   *
   * @param {EnumVariablesGlobales} key
   * @param {*} value
   * @memberof VariablesGlobalesService
   */
  public setData(key: EnumVariablesGlobales, value: any): void {
    const newData = { ...this.dataSubject.value, [key]: value };
    this.dataSubject.next(newData);
  }

  /**
   * Obtener un dato
   *
   * @param {string} key
   * @return {*}  {Observable<any>}
   * @memberof VariablesGlobalesService
   */
  public getData(key: string): Observable<any> {
    return this.dataSubject.asObservable().pipe(this.filterData(key));
  }

  /**
   * Filtrar la respuesta
   *
   * @private
   * @param {string} key
   * @return {*}  {OperatorFunction<any, any>}
   * @memberof VariablesGlobalesService
   */
  private filterData(key: string): OperatorFunction<any, any> {
    return map((resp: any) => {
      return resp[key];
    });
  }
}
