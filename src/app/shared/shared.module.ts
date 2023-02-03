import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutprincipalComponent } from './layoutprincipal/layoutprincipal.component';
import { MenuComponent } from '../Usuario/components/menu/menu.component';
import { AppRoutingModule } from './../app-routing.module'
import { TableroComponent } from '../Usuario/components/tablero/tablero.component';
@NgModule({
    declarations: [
        LayoutprincipalComponent,
        MenuComponent,
        TableroComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule
    ], bootstrap: [SharedModule]
})
export class SharedModule { }
