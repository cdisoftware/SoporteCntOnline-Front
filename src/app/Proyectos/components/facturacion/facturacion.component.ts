import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FacturacionService } from 'src/app/core/facturacion.service';
import { EmpresasService } from 'src/app/core/empresas.service';
@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent implements OnInit {

  Respuesta: string = '';
  NitEmpresa: string = '';
  NumFactura: string = '';
  Regnal: string = '';
  Pfjo: string = '';
  ArrayFactura: any = [];

  Nit: string = '';
  NumResolucion: string = '';
  Usuario: string = '';
  Contrasena: string = '';
  Prefijo: string = '';
  PrefijoNC: string = '';
  RangoD: string = '';
  RangoH: string = '';
  RangoFecIni: string = '';
  RangoFecFin: string = '';
  RangoNCD: string = '';
  RangoNCH: string = '';

  VerOcultarConsulta: boolean = false;
  VerOcultarActualizar: boolean = false;
  VerOcultarCamposTarget: boolean = false;
  VerOcultarFormAct: boolean = false;
  verOcultarLabel: boolean = false;

  NitFact: string = '';
  arregloListaFactura: any;

  constructor(public rutas: Router,
    private modalService: NgbModal,
    public facturaServices: FacturacionService,
    public empresaService: EmpresasService) { }

  ngOnInit(): void {
    this.LimpiarConsulta();
  }

  ConsultaFactura() {
    this.VerOcultarConsulta = true;
    this.VerOcultarActualizar = false;
    this.VerOcultarCamposTarget = false;
    this.VerOcultarFormAct = false;
    this.verOcultarLabel = false;
    this.NitFact = '';
  }

  HabilitarEmpresa() {
    this.VerOcultarConsulta = false;
    this.VerOcultarActualizar = true;
    this.VerOcultarCamposTarget = false;
    this.VerOcultarFormAct = false;
    this.verOcultarLabel = false;
    this.LimpiarConsulta();
  }

  LimpiarConsulta() {
    this.NitEmpresa = '';
    this.NumFactura = '';
    this.Regnal = '';
    this.Pfjo = '';
    this.ArrayFactura = [];
  }

  BuscarFactura() {
    this.VerOcultarCamposTarget = true;
    var auxNitEmp: string = '';
    var auxNumFactura: string = '';
    var auxIdCol: string = '';
    var prefi: string = '';
    if (this.NitEmpresa == '') {
      auxNitEmp = '0';
    } else {
      auxNitEmp = this.NitEmpresa;
    }
    if (this.NumFactura == '') {
      auxNumFactura = '0';
    } else {
      auxNumFactura = this.NumFactura;
    }
    if (this.Regnal == '') {
      auxIdCol = '0';
    } else {
      auxIdCol = this.Regnal;
    }
    if (this.Pfjo == '') {
      prefi = '0';
    } else {
      prefi = this.Pfjo;
    }
    this.facturaServices.ConsultaFactura(auxNumFactura, auxIdCol, auxNitEmp, prefi).subscribe(Resultado => {
      if (Resultado != null && Resultado != undefined && Resultado != '') {
        this.ArrayFactura = Resultado;
      } else {
        this.verOcultarLabel = true;
        this.ArrayFactura = [];
      }
    })
  }

  BuscarHabilitarEmpresa() {
    this.verOcultarLabel = false;
    var auxNit: string = '';
    if (this.NitFact == '') {
      auxNit = '1';
    } else {
      auxNit = this.NitFact;
    }
    this.empresaService.ConsultaEmpresas(auxNit, '0', '0').subscribe(Resultado => {
      if (Resultado != null && Resultado != undefined && Resultado != '') {
        this.arregloListaFactura = Resultado;
        this.VerOcultarFormAct = true;
        this.NitFact = '';
      } else {
        this.verOcultarLabel = true;
        this.arregloListaFactura = [];
      }
    })
  }

  GuardarHabilitarEmpresa(templateMensaje: any) {
    /* if (this.NumResolucion == undefined || this.NumResolucion == null || this.NumResolucion == '0' || this.NumResolucion == '') {
       this.Respuesta = 'El campo número de resolución es obligatorio.';
       this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
     } else if (this.Usuario == undefined || this.Usuario == null || this.Usuario == '0' || this.Usuario == '') {
       this.Respuesta = 'El campo usuario es obligatorio.';
       this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
     } else if (this.Contrasena == undefined || this.Contrasena == null || this.Contrasena == '0' || this.Contrasena == '') {
       this.Respuesta = 'El campo contraseña es obligatorio.';
       this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
     } else if (this.Prefijo == undefined || this.Prefijo == null || this.Prefijo == '0' || this.Prefijo == '') {
       this.Respuesta = 'El campo prefijo es obligatorio.';
       this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
     } else if (this.PrefijoNC == undefined || this.PrefijoNC == null || this.PrefijoNC == '0' || this.PrefijoNC == '') {
       this.Respuesta = 'El campo prefijoNC es obligatorio.';
       this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
     } else if (this.RangoD == undefined || this.RangoD == null || this.RangoD == '0' || this.RangoD == '') {
       this.Respuesta = 'El campo rango desde es obligatorio.';
       this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
     } else if (this.RangoH == undefined || this.RangoH == null || this.RangoH == '0' || this.RangoH == '') {
       this.Respuesta = 'El campo rango hasta es obligatorio.';
       this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
     } else if (this.RangoFecIni == undefined || this.RangoFecIni == null || this.RangoFecIni == '0' || this.RangoFecIni == '') {
       this.Respuesta = 'El campo rango fecha inicio es obligatorio.';
       this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
     } else if (this.RangoFecFin == undefined || this.RangoFecFin == null || this.RangoFecFin == '0' || this.RangoFecFin == '') {
       this.Respuesta = 'El campo rango fecha fin es obligatorio.';
       this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
     } else if (this.RangoNCD == undefined || this.RangoNCD == null || this.RangoNCD == '0' || this.RangoNCD == '') {
       this.Respuesta = 'El campo RangoNCD es obligatorio.';
       this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
     } else if (this.RangoNCH == undefined || this.RangoNCH == null || this.RangoNCH == '0' || this.RangoNCH == '') {
       this.Respuesta = 'El campo RangoNCH es obligatorio.';
       this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
     } else {*/
    const body = {
      NumResolucion: this.arregloListaFactura[0].NumResolucion,
      Usuario: this.arregloListaFactura[0].Usuario,
      Contrasena: this.arregloListaFactura[0].Contrasena,
      Prefijo: this.arregloListaFactura[0].Prefijo,
      RangoD: this.arregloListaFactura[0].RangoD,
      RangoH: this.arregloListaFactura[0].RangoH,
      RangoFecIni: this.arregloListaFactura[0].RangoFecIni,
      RangoFecFin: this.arregloListaFactura[0].RangoFecFin,
      PrefijoNC: this.arregloListaFactura[0].PrefijoNC,
      RangoNCD: this.arregloListaFactura[0].RangoNCD,
      RangoNCH: this.arregloListaFactura[0].RangoNCH,
      Nit: this.arregloListaFactura[0].Nit
    }
    console.log(body)
    this.facturaServices.ActFacturacion(body).subscribe(Resultado => {
      console.log(Resultado)
      this.Respuesta = Resultado;
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.LimpiarFormularioAct();
      this.ConsultaFactura();
    })
    //}
  }

  LimpiarFormularioAct() {
    this.arregloListaFactura[0].NumResolucion = '';
    this.arregloListaFactura[0].Usuario = '';
    this.arregloListaFactura[0].Contrasena = '';
    this.arregloListaFactura[0].Prefijo = '';
    this.arregloListaFactura[0].RangoD = '';
    this.arregloListaFactura[0].RangoH = '';
    this.arregloListaFactura[0].RangoFecIni = '';
    this.arregloListaFactura[0].RangoFecFin = '';
    this.arregloListaFactura[0].RangoNCD = '';
    this.arregloListaFactura[0].RangoNCH = '';
    this.arregloListaFactura[0].PrefijoNC = '';
  }

  Cancelar() {
    this.VerOcultarConsulta = false;
    this.VerOcultarActualizar = false;
    this.VerOcultarCamposTarget = false;
    this.VerOcultarFormAct = false;
  }
}
