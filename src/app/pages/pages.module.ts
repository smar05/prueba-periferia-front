import { NgModule } from '@angular/core';
import { ConsultaComponent } from './consulta/consulta.component';
import { InformacionComponent } from './informacion/informacion.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [ConsultaComponent, InformacionComponent],
  imports: [PagesRoutingModule],
  providers: [],
})
export class PagesModule {}
