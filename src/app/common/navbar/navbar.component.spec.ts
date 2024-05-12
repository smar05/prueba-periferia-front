import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { of } from 'rxjs';
import { EnumVariablesGlobales } from 'src/app/enums/EnumVariablesGlobales';
import { EnumRutas } from 'src/app/enums/EnumRutas';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', function () {
    const initSpy = spyOn(component as any, 'initObservables').and.returnValue(
      null
    );
    component.ngOnInit();
    expect(initSpy).toHaveBeenCalled();
  });

  it('initObservables', function () {
    const obserSpy = spyOn(component['obser'], 'getData').and.returnValue(
      of(null)
    );

    component['initObservables']();

    expect(obserSpy).toHaveBeenCalledWith(EnumVariablesGlobales.TITULO_NAVBAR);
    expect(obserSpy).toHaveBeenCalledWith(EnumVariablesGlobales.ATRAS_NAVBAR);
    expect(obserSpy).toHaveBeenCalledWith(EnumVariablesGlobales.URL_ATRAS);
  });

  it('atras', function () {
    component.urlAtras = EnumRutas.INICIO;
    const routerSpy = spyOn(component['router'], 'navigate');

    component.atras();

    expect(routerSpy).toHaveBeenCalledWith([EnumRutas.INICIO]);
  });
});
