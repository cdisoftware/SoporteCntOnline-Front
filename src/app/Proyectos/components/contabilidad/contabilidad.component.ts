import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresasService } from 'src/app/core/empresas.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-contabilidad',
  templateUrl: './contabilidad.component.html',
  styleUrls: ['./contabilidad.component.css']
})
export class ContabilidadComponent implements OnInit {


  ArrayEmpresa: any = [];
  Respuesta: string = '';
  //Variables Detalle Empresa
  Nit: string = '';
  NitInsert: string = '';
  NombreEmpresa: string = '';
  Regional: string = '';
  TipoPersona: string = '';
  Direccion: string = '';
  Correo: string = '';
  Telefono: string = '';
  Regimen: string = '';
  NumMatMercantil: string = '';
  ValCas53: string = '';
  ValCas54: string = '';
  NitCodVer: string = '';
  CodPostal: string = '';
  ActEco: string = '';
  TpoPersona: string = '0';
  Ciudad: string = '0';
  Departamento: string = '0';
  Pais: string = '0';
  codpais: string = '';
  NomPais: string = '';
  CodigoDepartamento: string = '';
  NombreDep: string = '';
  CodigoCiudad: string = '';
  NombreCiudad: string = '';

  ArrayPais: any;
  ArrayDepartamento: any;
  ArrayCiudad: any;
  ArrayTipoPersona: any;

  VerOcultarCamposCons: boolean = false;
  VerOcultarCamposInsert: boolean = false;
  VerOcultarCamposAct: boolean = false;
  VerOcultarCamposTarget: boolean = false;
  VerOcultarFormAct: boolean = false;
  verOcultarLabelC: boolean = false;
  arregloListaEmpresas: any;

  NitAct: string = '';

  constructor(public rutas: Router,
    public empresaService: EmpresasService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.ListarPais();
    this.NombreEmpresa = '';
    this.Nit = '';
    this.Regional = '';
    this.ArrayEmpresa = [];

  }
  ConsultaEmpresa() {
    this.VerOcultarCamposCons = true;
    this.VerOcultarCamposInsert = false;
    this.VerOcultarCamposAct = false;
    this.VerOcultarCamposTarget = false;
    this.VerOcultarFormAct = false;
    this.verOcultarLabelC = false;
    this.LimpiarCampos();
  }
  CrearEmpresa() {
    this.VerOcultarCamposCons = false;
    this.VerOcultarCamposInsert = true;
    this.VerOcultarCamposAct = false;
    this.VerOcultarCamposTarget = false;
    this.VerOcultarFormAct = false;
    this.verOcultarLabelC = false;
    this.limpiar();
  }

  ActualizaEmpresa() {
    this.VerOcultarCamposCons = false;
    this.VerOcultarCamposInsert = false;
    this.VerOcultarCamposAct = true;
    this.VerOcultarCamposTarget = false;
    this.verOcultarLabelC = false;
    this.limpiar();
    this.LimpiarCampos();
  }

  VerConsultaEmp() {
    var auxNitEmp: string = '';
    var auxRegional: string = '';
    var auxNomEmp: string = '';

    if (this.Nit == '') {
      auxNitEmp = '0';
    } else {
      auxNitEmp = this.Nit;
    }
    if (this.Regional == '') {
      auxRegional = '0';
    } else {
      auxRegional = this.Regional;
    }
    if (this.NombreEmpresa == '') {
      auxNomEmp = '0';
    } else {
      auxNomEmp = this.NombreEmpresa;
    }
    this.VerOcultarCamposCons = true;
    this.VerOcultarCamposInsert = false;
    this.VerOcultarCamposAct = false;
    this.empresaService.ConsultaEmpresas(auxNitEmp, auxRegional, auxNomEmp).subscribe(Resultado => {
      if (Resultado != null && Resultado != undefined && Resultado != '') {
        this.ArrayEmpresa = Resultado;
        this.VerOcultarCamposTarget = true;
      } else {
        this.verOcultarLabelC = true;
        this.ArrayEmpresa = [];
      }
    })
  }

  BuscarEmpNit() {
    this.verOcultarLabelC = false;
    var auxNit: string = '';
    if (this.NitAct == '') {
      auxNit = '1';
      this.verOcultarLabelC = true;
    } else {
      auxNit = this.NitAct;
    }
    this.empresaService.ConsultaEmpresas(auxNit, '0', '0').subscribe(Resultado => {
      if (Resultado != null && Resultado != undefined && Resultado != '') {
        this.arregloListaEmpresas = Resultado;
        this.codpais = Resultado[0].CodPais;
        this.ListarDep();
        this.arregloListaEmpresas[0].CodigoDepartamento = Resultado[0].CodDepto;
        this.CodigoDepartamento = Resultado[0].CodDepto;
        this.ListarCiudad();
        this.arregloListaEmpresas[0].CodMuni = Resultado[0].CodMuni;
        this.VerOcultarFormAct = true;
        this.NitAct = '';
      } else {
        this.verOcultarLabelC = true;
        this.arregloListaEmpresas = [];
      }
    })
  }

  limpiar() {
    this.NombreEmpresa = '';
    this.Nit = '';
    this.Regional = '';
    this.ArrayEmpresa = [];
  }



  InsertarEmpresa(templateMensaje: any) {

    if (this.Regional == undefined || this.Regional == null || this.Regional == '') {
      this.Respuesta = 'El campo regional es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.NombreEmpresa == undefined || this.NombreEmpresa == null || this.NombreEmpresa == '0') {
      this.Respuesta = 'El campo nombre empresa es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.NitInsert == undefined || this.NitInsert == null || this.NitInsert == '0') {
      this.Respuesta = 'El campo nit es obligatorio.';
    } else if (this.Pais == undefined || this.Pais == null || this.Pais == '0') {
      this.Respuesta = 'El campo país es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.Departamento == undefined || this.Departamento == null || this.Departamento == '0') {
      this.Respuesta = 'El campo departamento es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.Ciudad == undefined || this.Ciudad == null || this.Ciudad == '0') {
      this.Respuesta = 'El campo ciudad es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.Direccion == undefined || this.Direccion == null || this.Direccion == '0') {
      this.Respuesta = 'El campo dirección es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.Correo == undefined || this.Correo == null || this.Correo == '0') {
      this.Respuesta = 'El campo correo es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.Telefono == undefined || this.Telefono == null || this.Telefono == '0') {
      this.Respuesta = 'El campo teléfono es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.TpoPersona == undefined || this.TpoPersona == null || this.TpoPersona == '0') {
      this.Respuesta = 'El campo tipo persona es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.Regimen == undefined || this.Regimen == null || this.Regimen == '0') {
      this.Respuesta = 'El campo régimen es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.NumMatMercantil == undefined || this.NumMatMercantil == null || this.NumMatMercantil == '0') {
      this.Respuesta = 'El campo numero matricula mercantil es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.ValCas53 == undefined || this.ValCas53 == null || this.ValCas53 == '0') {
      this.Respuesta = 'El campo valCas53 es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.ValCas54 == undefined || this.ValCas54 == null || this.ValCas54 == '0') {
      this.Respuesta = 'El campo valCas54 es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.NitCodVer == undefined || this.NitCodVer == null || this.NitCodVer == '0') {
      this.Respuesta = 'El campo nit codigo verificación es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.CodPostal == undefined || this.CodPostal == null || this.CodPostal == '0') {
      this.Respuesta = 'El campo código postal es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.ActEco == undefined || this.ActEco == null || this.ActEco == '0') {
      this.Respuesta = 'El campo actividad economica es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })

    } else {
      const body = {
        IdCol: this.Regional,
        Nombre: this.NombreEmpresa,
        Nit: this.NitInsert,
        Departamento: this.NombreDep,
        Ciudad: this.NombreCiudad,
        Direccion: this.Direccion,
        Email: this.Correo,
        Telefono: this.Telefono,
        TipoPersona: this.TpoPersona,
        Regimen: this.Regimen,
        CodPais: this.codpais,
        CodDepto: this.CodigoDepartamento,
        NumMatMercantil: this.NumMatMercantil,
        ValCas53: this.ValCas53,
        ValCas54: this.ValCas54,
        NitCodVer: this.NitCodVer,
        CodMuni: this.CodigoCiudad,
        NomPais: this.NomPais,
        CodPostal: this.CodPostal,
        ActEco: this.ActEco
      }
      this.empresaService.InsertEmpresa(body).subscribe(Resultado => {
        this.Respuesta = Resultado;
        this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
        this.LimpiarCampos();
        this.ConsultaEmpresa();
      })
    }
  }

  LimpiarCampos() {
    this.Regional = '';
    this.NombreEmpresa = '';
    this.NitInsert = '';
    this.Departamento = '0';
    this.Ciudad = '0';
    this.Direccion = '';
    this.Correo = '';
    this.Telefono = '';
    this.TpoPersona = '0';
    this.Regimen = '';
    this.NumMatMercantil = '';
    this.ValCas53 = '';
    this.ValCas54 = '';
    this.NitCodVer = '';
    this.Pais = '0';
    this.CodPostal = '';
    this.ActEco = '';
  }
  Cancelar() {
    this.VerOcultarCamposCons = false;
    this.VerOcultarCamposInsert = false;
    this.VerOcultarCamposAct = false;
    this.VerOcultarCamposTarget = false;
    this.VerOcultarFormAct = false;
  }

  ListarPais() {
    this.empresaService.ConsultaPais().subscribe(Resultado => {
      this.ArrayPais = Resultado;
    })
  }
  ListarDep() {
    this.empresaService.ConsultaDepartamento(this.codpais).subscribe(Resultado => {
      this.ArrayDepartamento = Resultado;
    })
  }

  ListarCiudad() {
    this.empresaService.ConsultaCiudad(this.CodigoDepartamento).subscribe(Resultado => {
      this.ArrayCiudad = Resultado;
    })
  }
  SelectListaPais(codigoNombrePais: any) {
    var arraypai = codigoNombrePais.split('|');
    if (arraypai[0] != "0") {
      this.codpais = arraypai[0];
      this.NomPais = arraypai[1];
      this.ListarDep();
    } else {
      this.ArrayDepartamento = [];
      this.ArrayCiudad = [];
      this.codpais = '';
      this.NomPais = '';
      this.CodigoDepartamento = '';
      this.NombreDep = '';
      this.Departamento = '0';
      this.Ciudad = '0';
    }
  }

  SelectListaDep(selectDepartamento: any) {
    var arrdep = selectDepartamento.split('|');
    if (arrdep[0] != "0") {
      this.CodigoDepartamento = arrdep[0];
      this.NombreDep = arrdep[1];
      this.ListarCiudad();
      this.Ciudad = '0';
    } else {
      this.ArrayCiudad = [];
      this.CodigoDepartamento = '';
      this.NombreDep = '';
      this.CodigoCiudad = '';
      this.NombreCiudad = '';
    }

  }
  SelectListaciudad(selectciudad: any) {
    var arrCiudad = selectciudad.split('|');
    if (arrCiudad[0] != "0") {
      this.CodigoCiudad = arrCiudad[0];
      this.NombreCiudad = arrCiudad[1];
    } else {
      this.CodigoCiudad = '';
      this.NombreCiudad = '';
    }
  }

  BuscActEmpresa(templateMensaje: any) {
    if (this.NombreEmpresa == undefined || this.NombreEmpresa == null || this.NombreEmpresa == '0') {
      this.Respuesta = 'El campo nombre empresa es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.Nit == undefined || this.Nit == null || this.Nit == '0') {
      this.Respuesta = 'El campo nit es obligatorio.';
    } else if (this.codpais == undefined || this.codpais == null || this.codpais == '0') {
      this.Respuesta = 'El campo país es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.CodigoDepartamento == undefined || this.CodigoDepartamento == null || this.CodigoDepartamento == '0') {
      this.Respuesta = 'El campo departamento es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.CodigoCiudad == undefined || this.CodigoCiudad == null || this.CodigoCiudad == '0') {
      this.Respuesta = 'El campo ciudad es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.Direccion == undefined || this.Direccion == null || this.Direccion == '0') {
      this.Respuesta = 'El campo dirección es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.Correo == undefined || this.Correo == null || this.Correo == '0') {
      this.Respuesta = 'El campo correo es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.Telefono == undefined || this.Telefono == null || this.Telefono == '0') {
      this.Respuesta = 'El campo teléfono es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.TipoPersona == undefined || this.TipoPersona == null || this.TipoPersona == '0') {
      this.Respuesta = 'El campo tipo persona es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.Regimen == undefined || this.Regimen == null || this.Regimen == '0') {
      this.Respuesta = 'El campo régimen es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.NumMatMercantil == undefined || this.NumMatMercantil == null || this.NumMatMercantil == '0') {
      this.Respuesta = 'El campo numero matricula mercantil es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.ValCas53 == undefined || this.ValCas53 == null || this.ValCas53 == '0') {
      this.Respuesta = 'El campo valCas53 es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.ValCas54 == undefined || this.ValCas54 == null || this.ValCas54 == '0') {
      this.Respuesta = 'El campo valCas54 es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.NitCodVer == undefined || this.NitCodVer == null || this.NitCodVer == '0') {
      this.Respuesta = 'El campo nit codigo verificación es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.CodPostal == undefined || this.CodPostal == null || this.CodPostal == '0') {
      this.Respuesta = 'El campo código postal es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.ActEco == undefined || this.ActEco == null || this.ActEco == '0') {
      this.Respuesta = 'El campo actividad economica es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else {
      const body = {
        IdCol: this.arregloListaEmpresas[0].IdCol,
        Nombre: this.arregloListaEmpresas[0].Nombre,
        Nit: this.arregloListaEmpresas[0].Nit,
        Departamento: this.arregloListaEmpresas[0].Departamento,
        Ciudad: this.arregloListaEmpresas[0].Ciudad,
        Direccion: this.arregloListaEmpresas[0].Direccion,
        Email: this.arregloListaEmpresas[0].Email,
        Telefono: this.arregloListaEmpresas[0].Telefono,
        TipoPersona: this.arregloListaEmpresas[0].TipoPersona,
        Regimen: this.arregloListaEmpresas[0].Regimen,
        CodPais: this.arregloListaEmpresas[0].CodPais,
        CodDepto: this.arregloListaEmpresas[0].CodDepto,
        NumMatMercantil: this.arregloListaEmpresas[0].NumMatMercantil,
        ValCas53: this.arregloListaEmpresas[0].ValCas53,
        ValCas54: this.arregloListaEmpresas[0].ValCas54,
        NitCodVer: this.arregloListaEmpresas[0].NitCodVer,
        CodMuni: this.arregloListaEmpresas[0].CodMuni,
        NomPais: this.arregloListaEmpresas[0].NomPais,
        CodPostal: this.arregloListaEmpresas[0].CodPostal,
        ActEco: this.arregloListaEmpresas[0].ActEco
      }
      console.log(body)
      this.empresaService.ActEmpresa(body).subscribe(Resultado => {
        this.Respuesta = Resultado;
        this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
        this.ConsultaEmpresa();
      })
    }
  }
}