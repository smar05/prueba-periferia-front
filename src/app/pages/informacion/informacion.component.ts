import { Component, OnInit } from '@angular/core';
import { EnumTipoDocumento } from 'src/app/enums/EnumTipoDocumento';
import { EnumVariablesGlobales } from 'src/app/enums/EnumVariablesGlobales';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { VariablesGlobalesService } from 'src/app/services/variables-globales.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css'],
})
export class InformacionComponent implements OnInit {
  public datosUsuario: IUsuario = null as any;

  constructor(private obser: VariablesGlobalesService) {}

  public ngOnInit(): void {
    this.obser.setData(EnumVariablesGlobales.TITULO_NAVBAR, 'Información');
    this.consultarDatos();
  }

  private consultarDatos(): void {
    this.obser
      .getData(EnumVariablesGlobales.DATOS_USUARIO)
      .subscribe((res: IUsuario) => {
        let tiposDocumento: { [key: string]: string } = EnumTipoDocumento;
        let tipoDocumento: string = '';
        for (const key of Object.keys(tiposDocumento)) {
          if (key === res.tipoDocumento) {
            tipoDocumento = tiposDocumento[key];
            break;
          }
        }
        this.datosUsuario = { ...res, tipoDocumento };
      });
  }
}
