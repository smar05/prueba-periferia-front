import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaComponent } from './consulta.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EnumVariablesGlobales } from 'src/app/enums/EnumVariablesGlobales';
import { from, of } from 'rxjs';
import { IUsuario } from 'src/app/interfaces/IUsuario';

describe('ConsultaComponent', () => {
  let component: ConsultaComponent;
  let fixture: ComponentFixture<ConsultaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, ReactiveFormsModule],
      declarations: [ConsultaComponent],
    });
    fixture = TestBed.createComponent(ConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', function () {
    const spy = spyOn(component['obser'], 'setData');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('buscar', async () => {
    component.f.controls['tipoDocumento'].setValue('Cédula de ciudadanía');
    component.f.controls['numeroDocumento'].setValue('23 445 322');
    const apiBackSpy = spyOn(
      component['apiBackService'],
      'getByTipoDocumentoAndNumeroDocumento'
    ).and.returnValue(of({ id: 1 } as IUsuario));
    const routerSpy = spyOn(component['router'], 'navigate');

    await component.buscar();

    expect(apiBackSpy).toHaveBeenCalledWith({
      tipoDocumento: 'C',
      numeroDocumento: 23445322,
    });
    expect(routerSpy).toHaveBeenCalledWith(['informacion']);
  });

  it('buscar - no res', async () => {
    component.f.controls['tipoDocumento'].setValue('Cédula de ciudadanía');
    component.f.controls['numeroDocumento'].setValue('23 445 322');
    const apiBackSpy = spyOn(
      component['apiBackService'],
      'getByTipoDocumentoAndNumeroDocumento'
    ).and.returnValue(of(null as any));
    const routerSpy = spyOn(component['router'], 'navigate');

    await component.buscar();

    expect(apiBackSpy).toHaveBeenCalledWith({
      tipoDocumento: 'C',
      numeroDocumento: 23445322,
    });
    expect(routerSpy).not.toHaveBeenCalledWith(['informacion']);
  });

  it('buscar - form invalid', async () => {
    component.f.controls['tipoDocumento'].setValue('');
    component.f.controls['numeroDocumento'].setValue('');

    await component.buscar();

    expect(component.f.invalid).toBeTruthy();
  });

  it('buscar - error', async () => {
    component.f.controls['tipoDocumento'].setValue('Cédula de ciudadanía');
    component.f.controls['numeroDocumento'].setValue('23 445 322');
    const apiSpy = spyOn(
      component['apiBackService'],
      'getByTipoDocumentoAndNumeroDocumento'
    ).and.returnValue(from(Promise.reject({ status: 404 })));
    const routerSpy = spyOn(component['router'], 'navigate');
    const alertSpy = spyOn(component['alertService'], 'basicAlert');

    try {
      await component.buscar();
    } catch (error) {
      expect(error).toEqual({ status: 404 });
      expect(component.f.invalid).toBeFalse();
      expect(apiSpy).toHaveBeenCalledWith({
        tipoDocumento: 'C',
        numeroDocumento: 23445322,
      });
      expect(routerSpy).not.toHaveBeenCalled();
      expect(alertSpy).toHaveBeenCalledWith(
        'Alerta',
        'No se encontraron datos',
        'warning'
      );
    }
  });

  it('buscar - error 400', async () => {
    component.f.controls['tipoDocumento'].setValue('Cédula de ciudadanía');
    component.f.controls['numeroDocumento'].setValue('23 445 322');
    const apiSpy = spyOn(
      component['apiBackService'],
      'getByTipoDocumentoAndNumeroDocumento'
    ).and.returnValue(from(Promise.reject({ status: 400 })));
    const routerSpy = spyOn(component['router'], 'navigate');
    const alertSpy = spyOn(component['alertService'], 'basicAlert');

    try {
      await component.buscar();
    } catch (error) {
      expect(error).toEqual({ status: 400 });
      expect(component.f.invalid).toBeFalse();
      expect(apiSpy).toHaveBeenCalledWith({
        tipoDocumento: 'C',
        numeroDocumento: 23445322,
      });
      expect(routerSpy).not.toHaveBeenCalled();
      expect(alertSpy).toHaveBeenCalled();
    }
  });

  it('buscar - error 500', async () => {
    component.f.controls['tipoDocumento'].setValue('Cédula de ciudadanía');
    component.f.controls['numeroDocumento'].setValue('23 445 322');
    const apiSpy = spyOn(
      component['apiBackService'],
      'getByTipoDocumentoAndNumeroDocumento'
    ).and.returnValue(from(Promise.reject({ status: 500 })));
    const routerSpy = spyOn(component['router'], 'navigate');
    const alertSpy = spyOn(component['alertService'], 'basicAlert');

    try {
      await component.buscar();
    } catch (error) {
      expect(error).toEqual({ status: 500 });
      expect(component.f.invalid).toBeFalse();
      expect(apiSpy).toHaveBeenCalledWith({
        tipoDocumento: 'C',
        numeroDocumento: 23445322,
      });
      expect(routerSpy).not.toHaveBeenCalled();
      expect(alertSpy).toHaveBeenCalled();
    }
  });

  it('buscar - error default', async () => {
    component.f.controls['tipoDocumento'].setValue('Cédula de ciudadanía');
    component.f.controls['numeroDocumento'].setValue('23 445 322');
    const apiSpy = spyOn(
      component['apiBackService'],
      'getByTipoDocumentoAndNumeroDocumento'
    ).and.returnValue(from(Promise.reject({ status: 0 })));
    const routerSpy = spyOn(component['router'], 'navigate');
    const alertSpy = spyOn(component['alertService'], 'basicAlert');

    try {
      await component.buscar();
    } catch (error) {
      expect(error).toEqual({ status: 0 });
      expect(component.f.invalid).toBeFalse();
      expect(apiSpy).toHaveBeenCalledWith({
        tipoDocumento: 'C',
        numeroDocumento: 23445322,
      });
      expect(routerSpy).not.toHaveBeenCalled();
      expect(alertSpy).toHaveBeenCalled();
    }
  });

  it('formatNumber', function () {
    component.f.controls['numeroDocumento'].setValue('1234567890');

    component.formatNumber();

    expect(component.f.controls['numeroDocumento'].value).toEqual(
      '1 234 567 890'
    );
  });
});
