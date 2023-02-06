import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresasService } from 'src/app/core/empresas.service';
@Component({
  selector: 'app-contabilidad',
  templateUrl: './contabilidad.component.html',
  styleUrls: ['./contabilidad.component.css']
})
export class ContabilidadComponent implements OnInit {


  ArrayEmpresa: any = [];

  //Variables Detalle Empresa
  Nit: string = '';
  NombreEmpresa: string = '';
  Regional: string = '';
  TipoPersona: string = '';

  VerOcultarCampos: boolean = true;


  constructor(public rutas: Router,
    public empresaService: EmpresasService) { }

  ngOnInit(): void {

  }

  ConsultaEmp() {
    var auxNitEmp: string = '';
    var auxRegional: string = '';
    var auxNomEmp: string = '';

    if (this.Nit == '') {
      auxNitEmp = '0';
    }else{
      auxNitEmp = this.Nit;
    }
    if (this.Regional == '') {
      auxRegional = '0';
    }else{
      auxRegional = this.Regional;
    }
    if (this.NombreEmpresa == '') {
      auxNomEmp = '0';
    }else{
      auxNomEmp = this.NombreEmpresa;
    }
    this.VerOcultarCampos = true;
    this.empresaService.ConsultaEmpresas(auxNitEmp, auxRegional, auxNomEmp).subscribe(Resultado => {
      this.ArrayEmpresa = Resultado;

    })
  }

  limpiar() {
    this.NombreEmpresa = '';
    this.Nit = '';
    this.Regional = '';
    this.ArrayEmpresa = [];
  }

  InsertaEmp() {
    this.VerOcultarCampos = false;
  }
}
