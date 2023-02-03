import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Usuario/components/login/login.component'
import { LayoutprincipalComponent } from './shared/layoutprincipal/layoutprincipal.component';
import { ContabilidadComponent } from './Proyectos/components/contabilidad/contabilidad.component';
import { TableroComponent } from './Usuario/components/tablero/tablero.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: LayoutprincipalComponent,
    children: [
      {
        path: '',
        component: TableroComponent
      },
      {
        path: 'contabilidad',
        component: ContabilidadComponent
      }
    ]

  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
