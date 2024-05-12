import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnumRutas } from 'src/app/enums/EnumRutas';
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

  constructor(
    private obser: VariablesGlobalesService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.obser.setData(EnumVariablesGlobales.TITULO_NAVBAR, 'Información');
    this.obser.setData(EnumVariablesGlobales.ATRAS_NAVBAR, true);
    this.obser.setData(EnumVariablesGlobales.URL_ATRAS, EnumRutas.INICIO);
    this.consultarDatos();
  }

  private consultarDatos(): void {
    this.obser.getData(EnumVariablesGlobales.DATOS_USUARIO).subscribe(
      (res: IUsuario) => {
        if (!res) this.router.navigate([`${EnumRutas.INICIO}`]);

        let tiposDocumento: { [key: string]: string } = EnumTipoDocumento;
        let tipoDocumento: string = '';
        for (const key of Object.keys(tiposDocumento)) {
          if (key === res.tipoDocumento) {
            tipoDocumento = tiposDocumento[key];
            break;
          }
        }
        this.datosUsuario = { ...res, tipoDocumento };
      },
      (error) => {
        console.error(error);
        this.router.navigate([`${EnumRutas.INICIO}`]);
      }
    );
  }
}
