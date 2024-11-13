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


  public page!: number;

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
  MensajeModal: string = '';

  ArrayPais: any;
  ArrayDepartamento: any = [];
  ArrayCiudad: any;
  ArrayTipoPersona: any;

  VerOcultarCamposCons: boolean = false;
  VerOcultarCamposInsert: boolean = false;
  VerOcultarCamposAct: boolean = false;
  VerOcultarCamposTarget: boolean = false;
  VerOcultarFormAct: boolean = false;
  verOcultarLabelC: boolean = false;
  arregloListaEmpresas: any = [];
  verOcultarPge: boolean = false;
  verOcultarCamposEli: boolean = false;
  verOcultarFormEli:boolean = false;

  NitAct: string = '';

  constructor(public rutas: Router,
    public empresaService: EmpresasService,
    private modalService: NgbModal,
    private modalInfoEliminar: NgbModal,
    private modalEliminarEmpresa: NgbModal) { }

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
    this.verOcultarPge = false;
    this.verOcultarCamposEli = false;
    this.verOcultarFormEli = false;
    this.limpiar();
    this.LimpiarCampos();
  }
  CrearEmpresa() {
    this.VerOcultarCamposCons = false;
    this.VerOcultarCamposInsert = true;
    this.VerOcultarCamposAct = false;
    this.VerOcultarCamposTarget = false;
    this.VerOcultarFormAct = false;
    this.verOcultarLabelC = false;
    this.verOcultarPge = false;
    this.verOcultarCamposEli = false;
    this.verOcultarFormEli = false;
    this.limpiar();
  }
  ActualizaEmpresa() {
    this.VerOcultarCamposCons = false;
    this.VerOcultarCamposInsert = false;
    this.VerOcultarCamposAct = true;
    this.VerOcultarCamposTarget = false;
    this.verOcultarLabelC = false;
    this.verOcultarPge = false;
    this.verOcultarCamposEli = false;
    this.verOcultarFormEli = false;
    this.limpiar();
    this.LimpiarCampos();
  }
  EliminarEmpresa() {
    this.VerOcultarCamposCons = false;
    this.VerOcultarCamposInsert = false;
    this.VerOcultarCamposAct = false;
    this.VerOcultarCamposTarget = false;
    this.verOcultarLabelC = false;
    this.verOcultarPge = false;
    this.verOcultarCamposEli = true;
    this.verOcultarFormEli = false;
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

    this.empresaService.ConsultaEmpresas(auxNitEmp, auxRegional, auxNomEmp).subscribe(Resultado => {
      if (Resultado != null && Resultado != undefined && Resultado != '') {
        this.ArrayEmpresa = Resultado;
        this.VerOcultarCamposTarget = true;
        this.verOcultarPge = true;
        this.verOcultarLabelC = false;
      } else {
        this.verOcultarLabelC = true;
        this.verOcultarPge = false;
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
        this.CodigoDepartamento = Resultado[0].CodDepto;

        this.ListarDep();
        this.ListarCiudad();

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
    this.verOcultarPge = false;
    this.verOcultarFormEli = false;
    this.NitAct = '';
  }

  LimpiarInsert() {
    this.Regional = '';
    this.NombreEmpresa = '';
    this.NitInsert = '';
    this.Pais = '0';
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
    this.CodPostal = '';
    this.ActEco = '';
  }

  InsertarEmpresa(templateMensaje: any) {

    if (this.Regional == undefined || this.Regional == null || this.Regional == '') {
      this.Respuesta = 'El campo regional es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.NombreEmpresa == undefined || this.NombreEmpresa == null || this.NombreEmpresa == '') {
      this.Respuesta = 'El campo nombre empresa es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.NitInsert == undefined || this.NitInsert == null || this.NitInsert == '') {
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
    } else if (this.Direccion == undefined || this.Direccion == null || this.Direccion == '') {
      this.Respuesta = 'El campo dirección es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.Correo == undefined || this.Correo == null || this.Correo == '') {
      this.Respuesta = 'El campo correo es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.Telefono == undefined || this.Telefono == null || this.Telefono == '') {
      this.Respuesta = 'El campo teléfono es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.TpoPersona == undefined || this.TpoPersona == null || this.TpoPersona == '0') {
      this.Respuesta = 'El campo tipo persona es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.Regimen == undefined || this.Regimen == null || this.Regimen == '') {
      this.Respuesta = 'El campo régimen es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.NumMatMercantil == undefined || this.NumMatMercantil == null || this.NumMatMercantil == '') {
      this.Respuesta = 'El campo numero matricula mercantil es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.ValCas53 == undefined || this.ValCas53 == null || this.ValCas53 == '') {
      this.Respuesta = 'El campo valCas53 es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.ValCas54 == undefined || this.ValCas54 == null || this.ValCas54 == '') {
      this.Respuesta = 'El campo valCas54 es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.NitCodVer == undefined || this.NitCodVer == null || this.NitCodVer == '') {
      this.Respuesta = 'El campo nit codigo verificación es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.CodPostal == undefined || this.CodPostal == null || this.CodPostal == '') {
      this.Respuesta = 'El campo código postal es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.ActEco == undefined || this.ActEco == null || this.ActEco == '') {
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
        this.LimpiarInsert();
        this.ConsultaEmpresa();
      })
    }
  }


  Cancelar() {
    this.VerOcultarCamposCons = false;
    this.VerOcultarCamposInsert = false;
    this.VerOcultarCamposAct = false;
    this.VerOcultarCamposTarget = false;
    this.VerOcultarFormAct = false;
    this.LimpiarInsert();
    this.LimpiarCampos();
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
    this.Departamento = '0';
    this.Ciudad = '0';
    var arraypai = codigoNombrePais.split('|');
    if (arraypai[0] != "0") {
      this.codpais = arraypai[0];
      this.NomPais = arraypai[1];
      this.ListarDep();
    } else {
      this.ArrayDepartamento = [];
      this.ArrayCiudad = [];
      this.codpais = '0';
      this.NomPais = '0';
      this.CodigoDepartamento = '0';
      this.NombreDep = '0';
    }
  }

  SelectListaDep(selectDepartamento: any) {
    this.Ciudad = '0';
    var arrdep = selectDepartamento.split('|');
    if (arrdep[0] != "0") {
      this.CodigoDepartamento = arrdep[0];
      this.NombreDep = arrdep[1];
      this.ListarCiudad();
      this.Ciudad = '0';
    } else {
      this.ArrayCiudad = [];
      this.CodigoDepartamento = '0';
      this.NombreDep = '0';
      this.CodigoCiudad = '0';
      this.NombreCiudad = '0';
    }

  }
  SelectListaciudad(selectciudad: any) {
    var arrCiudad = selectciudad.split('|');
    if (arrCiudad[0] != "0") {
      this.CodigoCiudad = arrCiudad[0];
      this.NombreCiudad = arrCiudad[1];
    } else {
      this.CodigoCiudad = '0';
      this.NombreCiudad = '0';
    }
  }

  BuscActEmpresa(templateMensaje: any) {
    if (this.arregloListaEmpresas[0].Nombre == undefined || this.arregloListaEmpresas[0].Nombre == null || this.arregloListaEmpresas[0].Nombre == '') {
      this.Respuesta = 'El campo nombre empresa es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.arregloListaEmpresas[0].CodPais == undefined || this.arregloListaEmpresas[0].CodPais == null || this.arregloListaEmpresas[0].CodPais == '0') {
      this.Respuesta = 'El campo país es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.arregloListaEmpresas[0].CodDepto == undefined || this.arregloListaEmpresas[0].CodDepto == null || this.arregloListaEmpresas[0].CodDepto == '0') {
      this.Respuesta = 'El campo departamento es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.arregloListaEmpresas[0].CodMuni == undefined || this.arregloListaEmpresas[0].CodMuni == null || this.arregloListaEmpresas[0].CodMuni == '0') {
      this.Respuesta = 'El campo ciudad es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.arregloListaEmpresas[0].Direccion == undefined || this.arregloListaEmpresas[0].Direccion == null || this.arregloListaEmpresas[0].Direccion == '') {
      this.Respuesta = 'El campo dirección es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.arregloListaEmpresas[0].Email == undefined || this.arregloListaEmpresas[0].Email == null || this.arregloListaEmpresas[0].Email == '') {
      this.Respuesta = 'El campo correo es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.arregloListaEmpresas[0].Telefono == undefined || this.arregloListaEmpresas[0].Telefono == null || this.arregloListaEmpresas[0].Telefono == '') {
      this.Respuesta = 'El campo teléfono es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.arregloListaEmpresas[0].TipoPersona == undefined || this.arregloListaEmpresas[0].TipoPersona == null || this.arregloListaEmpresas[0].TipoPersona == '0') {
      this.Respuesta = 'El campo tipo persona es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.arregloListaEmpresas[0].Regimen == undefined || this.arregloListaEmpresas[0].Regimen == null || this.arregloListaEmpresas[0].Regimen == '') {
      this.Respuesta = 'El campo régimen es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.arregloListaEmpresas[0].NumMatMercantil == undefined || this.arregloListaEmpresas[0].NumMatMercantil == null || this.arregloListaEmpresas[0].NumMatMercantil == '') {
      this.Respuesta = 'El campo numero matricula mercantil es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.arregloListaEmpresas[0].ValCas53 == undefined || this.arregloListaEmpresas[0].ValCas53 == null || this.arregloListaEmpresas[0].ValCas53 == '') {
      this.Respuesta = 'El campo valCas53 es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.arregloListaEmpresas[0].ValCas54 == undefined || this.arregloListaEmpresas[0].ValCas54 == null || this.arregloListaEmpresas[0].ValCas54 == '') {
      this.Respuesta = 'El campo valCas54 es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.arregloListaEmpresas[0].NitCodVer == undefined || this.arregloListaEmpresas[0].NitCodVer == null || this.arregloListaEmpresas[0].NitCodVer == '') {
      this.Respuesta = 'El campo nit codigo verificación es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.arregloListaEmpresas[0].CodPostal == undefined || this.arregloListaEmpresas[0].CodPostal == null || this.arregloListaEmpresas[0].CodPostal == '') {
      this.Respuesta = 'El campo código postal es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.arregloListaEmpresas[0].ActEco == undefined || this.arregloListaEmpresas[0].ActEco == null || this.arregloListaEmpresas[0].ActEco == '') {
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
        CodPais: this.codpais,
        CodDepto: this.arregloListaEmpresas[0].CodDepto,
        NumMatMercantil: this.arregloListaEmpresas[0].NumMatMercantil,
        ValCas53: this.arregloListaEmpresas[0].ValCas53,
        ValCas54: this.arregloListaEmpresas[0].ValCas54,
        NitCodVer: this.arregloListaEmpresas[0].NitCodVer,
        CodMuni: this.arregloListaEmpresas[0].CodMuni,
        NomPais: this.NomPais,
        CodPostal: this.arregloListaEmpresas[0].CodPostal,
        ActEco: this.arregloListaEmpresas[0].ActEco
      }
      this.empresaService.ActEmpresa(body).subscribe(Resultado => {
        this.Respuesta = Resultado;
        this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
        this.ConsultaEmpresa();
      })
    }
  }

  SelectListaPaisAct(codigoNombrePais: any) {

    this.ArrayDepartamento = [];
    this.ArrayCiudad = [];

    this.arregloListaEmpresas[0].CodDepto = '0';
    this.arregloListaEmpresas[0].CodMuni = '0';

    var arraypai = codigoNombrePais.split('|');
    if (arraypai[0] != "0") {
      this.codpais = arraypai[0];
      this.NomPais = arraypai[1];

      this.arregloListaEmpresas[0].CodPais = arraypai[0];
      this.arregloListaEmpresas[0].NomPais = arraypai[1];

      this.ListarDep();
      this.arregloListaEmpresas[0].CodDepto = '0';
    } else {
      this.arregloListaEmpresas[0].CodPais = '0';
      this.arregloListaEmpresas[0].NomPais = '0';
      this.ArrayDepartamento = [];
      this.ArrayCiudad = [];
      this.arregloListaEmpresas[0].CodDepto = '0';
      this.arregloListaEmpresas[0].CodMuni = '0';
    }
  }

  SelectListaDepAct(selectDepartamento: any) {
    this.ArrayCiudad = [];
    this.arregloListaEmpresas[0].CodMuni = '0';
      this.arregloListaEmpresas[0].Ciudad = '0';
    var arrdep = selectDepartamento.split('|');
    if (arrdep[0] != "0") {
      this.arregloListaEmpresas[0].CodDepto = arrdep[0];
      this.arregloListaEmpresas[0].Departamento = arrdep[1];
      this.CodigoDepartamento = arrdep[0];
      this.ListarCiudad();
    } else {
      this.ArrayCiudad = [];
      this.arregloListaEmpresas[0].CodDepto = '0';
      this.arregloListaEmpresas[0].Departamento = '0';
    }
  }

  SelectListaciudadAct(selectciudad: any) {
    var arrCiudad = selectciudad.split('|');
    if (arrCiudad[0] != "0") {
      this.CodigoCiudad = arrCiudad[0];
      this.NombreCiudad = arrCiudad[1];

      this.arregloListaEmpresas[0].CodMuni = arrCiudad[0];
      this.arregloListaEmpresas[0].Ciudad = arrCiudad[1];
    } else {
      this.arregloListaEmpresas[0].CodMuni = '0';
      this.arregloListaEmpresas[0].Ciudad = '0';
    }
  }

  LimpiarCampos() {
    if (this.arregloListaEmpresas.length > 0) {
      this.arregloListaEmpresas[0].Nombre = '';
      this.arregloListaEmpresas[0].CodDepto = '0';
      this.arregloListaEmpresas[0].CodMuni = '0';
      this.arregloListaEmpresas[0].Direccion = '';
      this.arregloListaEmpresas[0].Email = '';
      this.arregloListaEmpresas[0].Telefono = '';
      this.arregloListaEmpresas[0].TipoPersona = '0';
      this.arregloListaEmpresas[0].Regimen = '';
      this.arregloListaEmpresas[0].NumMatMercantil = '';
      this.arregloListaEmpresas[0].ValCas53 = '';
      this.arregloListaEmpresas[0].ValCas54 = '';
      this.arregloListaEmpresas[0].NitCodVer = '';
      this.arregloListaEmpresas[0].CodPais = '0';
      this.arregloListaEmpresas[0].CodPostal = '';
      this.arregloListaEmpresas[0].ActEco = '';
    }

  }

  VerEliminarEmpresa(InfoEliminar:any) {
    if (this.Nit == '') {
      this.MensajeModal = "Señor usuario, para eliminar una empresa por lo menos debe ingresar el numero de Nit de la empresa a eliminar.";
      this.modalInfoEliminar.open (InfoEliminar, {size: 'md'})
    } else {
      var auxNomEmp:string = '';
      var auxNitEmp:string = '';
      var auxRegional:string = '';

      if (this.NombreEmpresa == '') {
        auxNomEmp = '0';
      } else {
        auxNomEmp = this.NombreEmpresa;
      }
      if (this.Nit == '') {
        auxNitEmp = '0';
      } else {
        auxNitEmp = this.Nit;
      }
      if (this.Regional == '') {
        auxRegional = '0'
      } else {
        auxRegional = this.Regional;
      }

      this.empresaService.ConsultaEmpresas(auxNitEmp, auxRegional, auxNomEmp).subscribe(ResultadoEliminar => {
        if (ResultadoEliminar != null && ResultadoEliminar != undefined && ResultadoEliminar!= '') {
          this.ArrayEmpresa = ResultadoEliminar;
          this.verOcultarFormEli = true;
        } else {
          this.ArrayEmpresa = [];
          this.MensajeModal = "Señor usuario, no se encuentra ninguna empresa con el número de Nit ingresado. Por favor verifique.";
          this.modalInfoEliminar.open (InfoEliminar, {size: 'md'});
        }
      })
    }
  }

  BtnInfoEliminar (InfoEliminar:any, EmpresaEliminar:any) {
    const body = {
      IdCol: '0',
      Nombre: '0',
      Nit: EmpresaEliminar.Nit,
      Departamento: '0',
      Ciudad: '0',
      Direccion: '0',
      Email: '0',
      Telefono: '0',
      TipoPersona: '0',
      Regimen: '0',
      CodPais: '0',
      CodDepto: '0',
      NumMatMercantil: '0',
      ValCas53: '0',
      ValCas54: '0',
      NitCodVer: '0',
      CodMuni: '0',
      NomPais: '0',
      CodPostal: '0',
      ActEco: '0'
    }
    this.empresaService.EliminarEmpresa(body).subscribe(ResultEliminarEmpresa => {
      this.MensajeModal = ResultEliminarEmpresa;  
      this.modalEliminarEmpresa.open(InfoEliminar, {size: 'md'});
    });
  }

  BtnEliminarEmp (BtnEliminarEmp:any) {
    this.modalEliminarEmpresa.open(BtnEliminarEmp, {size: 'md'});
  }
}
