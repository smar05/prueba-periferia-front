import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { EnumTipoDocumento } from 'src/app/enums/EnumTipoDocumento';
import { EnumVariablesGlobales } from 'src/app/enums/EnumVariablesGlobales';
import { IConsulta } from 'src/app/interfaces/IConsulta';
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
    tipoDocumento: [EnumTipoDocumento.C, { validators: [Validators.required] }],
    numeroDocumento: [
      '',
      {
        validators: [Validators.required, Validators.pattern(/^\d{8,11}$/)],
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
    private apiBackService: ApiBackService
  ) {}

  public ngOnInit(): void {
    // Se setea el titulo del navbar
    this.obser.setData(
      EnumVariablesGlobales.TITULO_NAVBAR,
      'Consulta de documento'
    );
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
      numeroDocumento: Number(this.numeroDocumento.value),
      tipoDocumento,
    };

    let res: any = null;
    try {
      res = await this.apiBackService
        .getByTipoDocumentoAndNumeroDocumento(dataConsulta)
        .toPromise();
      console.log('🚀 ~ ConsultaComponent ~ buscar ~ res:', res);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
