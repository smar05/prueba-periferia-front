import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnumRutas } from 'src/app/enums/EnumRutas';
import { EnumVariablesGlobales } from 'src/app/enums/EnumVariablesGlobales';
import { VariablesGlobalesService } from 'src/app/services/variables-globales.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public titulo: string = '';
  public showAtras: boolean = false;
  public urlAtras: EnumRutas = null as any;

  constructor(
    private obser: VariablesGlobalesService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.initObservables();
  }

  private initObservables(): void {
    this.obser
      .getData(EnumVariablesGlobales.TITULO_NAVBAR)
      .subscribe((value: string) => {
        this.titulo = value;
      });

    this.obser
      .getData(EnumVariablesGlobales.ATRAS_NAVBAR)
      .subscribe((value: boolean) => {
        this.showAtras = value;
      });

    this.obser
      .getData(EnumVariablesGlobales.URL_ATRAS)
      .subscribe((value: EnumRutas) => {
        this.urlAtras = value;
      });
  }

  public atras(): void {
    this.router.navigate([this.urlAtras]);
  }
}
