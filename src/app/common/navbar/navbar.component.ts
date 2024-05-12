import { Component, OnInit } from '@angular/core';
import { EnumVariablesGlobales } from 'src/app/enums/EnumVariablesGlobales';
import { VariablesGlobalesService } from 'src/app/services/variables-globales.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public titulo: string = '';

  constructor(private obser: VariablesGlobalesService) {}

  public ngOnInit(): void {
    this.obser
      .getData(EnumVariablesGlobales.TITULO_NAVBAR)
      .subscribe((value: string) => {
        this.titulo = value;
      });
  }
}
