import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaComponent } from './consulta/consulta.component';
import { InformacionComponent } from './informacion/informacion.component';
import { EnumRutas } from '../enums/EnumRutas';

const routes: Routes = [
  {
    path: EnumRutas.CONSULTA,
    component: ConsultaComponent,
  },
  {
    path: EnumRutas.INFORMACION,
    component: InformacionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
