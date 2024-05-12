import { Component, OnInit } from '@angular/core';
import { EnumVariablesGlobales } from 'src/app/enums/EnumVariablesGlobales';
import { VariablesGlobalesService } from 'src/app/services/variables-globales.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'],
})
export class ConsultaComponent implements OnInit {
  constructor(private obser: VariablesGlobalesService) {}

  public ngOnInit(): void {
    this.obser.setData(
      EnumVariablesGlobales.TITULO_NAVBAR,
      'Consulta de documento'
    );
  }
}
