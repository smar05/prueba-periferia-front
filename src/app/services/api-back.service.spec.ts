import { TestBed } from '@angular/core/testing';

import { ApiBackService } from './api-back.service';
import { HttpClientModule } from '@angular/common/http';
import { IConsulta } from '../interfaces/IConsulta';
import { EnumTipoDocumento } from '../enums/EnumTipoDocumento';
import { IUsuario } from '../interfaces/IUsuario';
import { of } from 'rxjs';

describe('ApiBackService', () => {
  let service: ApiBackService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(ApiBackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getByTipoDocumentoAndNumeroDocumento', function () {
    const consulta: IConsulta = {
      tipoDocumento: EnumTipoDocumento.C,
      numeroDocumento: 23445322,
    };

    const user: IUsuario = {
      id: 1,
      primerNombre: 'nombre',
      segundoNombre: 'nombre2',
      primerApellido: 'apellido',
      segundoApellido: 'apellido2',
      telefono: 'telefono',
      direccion: 'direccion',
      ciudad: 'ciudad',
      tipoDocumento: EnumTipoDocumento.C,
      numeroDocumento: 23445322,
    };
    const httpSpy = spyOn(service['http'], 'get').and.returnValue(of(user));

    const result = service.getByTipoDocumentoAndNumeroDocumento(consulta);

    result.subscribe((response) => {
      expect(response).toEqual(user);
      expect(httpSpy).toHaveBeenCalledWith(
        `${service['urlApiBack']}usuarios/getByTipoDocumentoAndNumeroDocumento`,
        consulta
      );
    });
  });
});
