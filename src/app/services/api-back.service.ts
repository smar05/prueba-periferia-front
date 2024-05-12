import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IConsulta } from '../interfaces/IConsulta';
import { Observable } from 'rxjs';
import { IUsuario } from '../interfaces/IUsuario';

@Injectable({
  providedIn: 'root',
})
export class ApiBackService {
  private urlApiBack: string = 'http://localhost:8090/';

  constructor(private http: HttpService) {}

  /**
   * Consultar un usuario por tipo de documento y numero de documento
   *
   * @param {IConsulta} consulta
   * @return {*}  {Observable<IUsuario>}
   * @memberof ApiBackService
   */
  public getByTipoDocumentoAndNumeroDocumento(
    consulta: IConsulta
  ): Observable<IUsuario> {
    return this.http.get(
      `${this.urlApiBack}usuarios/getByTipoDocumentoAndNumeroDocumento`,
      consulta
    );
  }
}
