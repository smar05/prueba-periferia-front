import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { EnumRutas } from './enums/EnumRutas';

const routes: Routes = [
  {
    path: EnumRutas.INICIO,
    redirectTo: `/${EnumRutas.CONSULTA}`,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: `/${EnumRutas.CONSULTA}`,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), PagesRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
