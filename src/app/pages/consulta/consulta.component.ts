import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EnumRutas } from 'src/app/enums/EnumRutas';
import { EnumTipoDocumento } from 'src/app/enums/EnumTipoDocumento';
import { EnumVariablesGlobales } from 'src/app/enums/EnumVariablesGlobales';
import { IConsulta } from 'src/app/interfaces/IConsulta';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { AlertService } from 'src/app/services/alert.service';
import { ApiBackService } from 'src/app/services/api-back.service';
import { VariablesGlobalesService } from 'src/app/services/variables-globales.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'],
})
export class ConsultaComponent implements OnInit {
  public tiposDeDocumentos: string[] = Object.values(EnumTipoDocumento);

  //Grupo de controles
  public f: UntypedFormGroup = this.form.group({
    tipoDocumento: ['', { validators: [Validators.required] }],
    numeroDocumento: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(14),
          Validators.pattern(/^\d{1,3}( \d{3})*$/),
        ],
      },
    ],
  });

  //Validaciones personalizadas
  get tipoDocumento() {
    return this.f.controls['tipoDocumento'];
  }

  get numeroDocumento() {
    return this.f.controls['numeroDocumento'];
  }

  constructor(
    private obser: VariablesGlobalesService,
    private form: UntypedFormBuilder,
    private apiBackService: ApiBackService,
    private router: Router,
    private alertService: AlertService
  ) {}

  public ngOnInit(): void {
    // Se setea el titulo del navbar
    this.obser.setData(
      EnumVariablesGlobales.TITULO_NAVBAR,
      'Consulta de documento'
    );
    this.obser.setData(EnumVariablesGlobales.ATRAS_NAVBAR, false);
  }

  /**
   * Funcion para buscar al usuario
   *
   * @return {*}  {void}
   * @memberof ConsultaComponent
   */
  public async buscar(): Promise<void> {
    if (this.f.invalid) return;

    let tipoDocumento: string = this.tipoDocumento.value;
    let tiposDocumentosObject: { [key: string]: string } = EnumTipoDocumento;
    for (const key of Object.keys(tiposDocumentosObject)) {
      if (tiposDocumentosObject[key] === tipoDocumento) {
        tipoDocumento = key;
        break;
      }
    }

    let dataConsulta: IConsulta = {
      numeroDocumento: Number(this.numeroDocumento.value?.split(' ').join('')),
      tipoDocumento,
    };

    let res: IUsuario = null as any;
    try {
      res = (await this.apiBackService
        .getByTipoDocumentoAndNumeroDocumento(dataConsulta)
        .toPromise()) as any;
    } catch (error) {
      console.error(error);

      switch ((error as any).status) {
        case 404: // Not found
          this.alertService.basicAlert(
            'Alerta',
            'No se encontraron datos',
            'warning'
          );
          break;

        case 400:
          this.alertService.basicAlert(
            'Error',
            'No se puede procesar la solicitud',
            'error'
          );
          break;

        case 500:
          this.alertService.basicAlert(
            'Error',
            'Error en el servidor',
            'error'
          );
          break;

        default:
          this.alertService.basicAlert(
            'Error',
            'Ha ocurrido un error',
            'error'
          );
          break;
      }
      throw error;
    }

    if (!res) return;

    this.obser.setData(EnumVariablesGlobales.DATOS_USUARIO, res);
    this.router.navigate([EnumRutas.INFORMACION]);
  }

  /**
   * Funcion para separar por miles el numero de documento
   *
   * @memberof ConsultaComponent
   */
  public formatNumber(): void {
    let numero: string = this.f.controls['numeroDocumento'].value;

    numero = numero
      .replace(/\s/g, '')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');

    this.f.controls['numeroDocumento'].setValue(numero, { emitEvent: false });
  }
}
