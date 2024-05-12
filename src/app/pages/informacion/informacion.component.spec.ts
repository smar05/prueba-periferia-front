import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionComponent } from './informacion.component';
import { EnumVariablesGlobales } from 'src/app/enums/EnumVariablesGlobales';
import { from, of } from 'rxjs';
import { EnumRutas } from 'src/app/enums/EnumRutas';

describe('InformacionComponent', () => {
  let component: InformacionComponent;
  let fixture: ComponentFixture<InformacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformacionComponent],
    });
    fixture = TestBed.createComponent(InformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', function () {
    const obserSpy = spyOn(component['obser'], 'setData');
    spyOn(component as any, 'consultarDatos').and.returnValue(null);

    component.ngOnInit();

    expect(obserSpy).toHaveBeenCalledWith(
      EnumVariablesGlobales.TITULO_NAVBAR,
      'Información'
    );
  });

  it('consultarDatos', function () {
    const mockData = { tipoDocumento: 'C', name: 'John Doe' };
    const obserSpy = spyOn(component['obser'], 'getData').and.returnValue(
      of(mockData)
    );

    component['consultarDatos']();

    expect(obserSpy).toHaveBeenCalledWith(EnumVariablesGlobales.DATOS_USUARIO);
    expect(component.datosUsuario).toBeDefined();
  });

  it('consultarDatos - error', function () {
    const obserSpy = spyOn(component['obser'], 'getData').and.returnValue(
      from(Promise.reject())
    );

    component['consultarDatos']();

    expect(obserSpy).toHaveBeenCalledWith(EnumVariablesGlobales.DATOS_USUARIO);
  });
});
