import { NgModule } from '@angular/core';
import { ConsultaComponent } from './consulta/consulta.component';
import { InformacionComponent } from './informacion/informacion.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ConsultaComponent, InformacionComponent],
  imports: [PagesRoutingModule, ReactiveFormsModule, CommonModule],
  providers: [],
})
export class PagesModule {}
