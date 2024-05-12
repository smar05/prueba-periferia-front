import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  /**
   * Metodo GET
   *
   * @param {string} url
   * @param {*} [params={}]
   * @return {*}  {Observable<any>}
   * @memberof HttpService
   */
  public get(url: string, params: any = {}): Observable<any> {
    return this.http.get(`${url}`, { params });
  }
}
