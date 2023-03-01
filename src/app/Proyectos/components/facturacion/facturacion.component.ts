import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FacturacionService } from 'src/app/core/facturacion.service';
import { EmpresasService } from 'src/app/core/empresas.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent implements OnInit {
  public page!: number;

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
  verOcultarPge: boolean = false;
  verOcultarXML: boolean = false;
  VerOcultarTargetXML: boolean = false;

  NitFact: string = '';
  arregloListaFactura: any;


  Reg: string = '';
  NumroFactura: string = '';
  Tipo: string = '0';
  Prefjo: string = '';
  Xml: string = '';
  ocultaBtnBuscar: string = '1';

  constructor(public rutas: Router,
    private modalService: NgbModal,
    public facturaServices: FacturacionService,
    public empresaService: EmpresasService,
    private formatofecha: DatePipe) { }

  ngOnInit(): void {
    this.LimpiarConsulta();
  }

  ConsultaFactura() {
    this.VerOcultarConsulta = true;
    this.VerOcultarActualizar = false;
    this.VerOcultarCamposTarget = false;
    this.VerOcultarFormAct = false;
    this.verOcultarLabel = false;
    this.verOcultarPge = false;
    this.verOcultarXML = false;
    this.VerOcultarTargetXML = false;
    this.NitFact = '';
    this.LimpiarXml();
  }

  HabilitarEmpresa() {
    this.VerOcultarConsulta = false;
    this.VerOcultarActualizar = true;
    this.VerOcultarCamposTarget = false;
    this.VerOcultarFormAct = false;
    this.verOcultarLabel = false;
    this.verOcultarPge = false;
    this.verOcultarXML = false;
    this.VerOcultarTargetXML = false;
    this.LimpiarConsulta();
    this.LimpiarXml();
  }

  GenXml() {
    this.VerOcultarConsulta = false;
    this.VerOcultarActualizar = false;
    this.VerOcultarCamposTarget = false;
    this.VerOcultarFormAct = false;
    this.verOcultarLabel = false;
    this.verOcultarPge = false;
    this.verOcultarXML = true;
    this.VerOcultarTargetXML = false;
  }

  LimpiarConsulta() {
    this.NitEmpresa = '';
    this.NumFactura = '';
    this.Regnal = '';
    this.Pfjo = '';
    this.verOcultarPge = false;
    this.ArrayFactura = [];
  }

  BuscarXML(templateMensaje: any) {
    var auxReg = this.Reg;
    var auxNumroFactura = this.NumroFactura;
    var auxTipo = this.Tipo;
    var auxPrefjo = this.Prefjo;
    if (this.Reg == undefined || this.Reg == null || this.Reg == '') {
      this.Respuesta = 'El filtro regional es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.NumroFactura == undefined || this.NumroFactura == null || this.NumroFactura == '') {
      this.Respuesta = 'El filtro número de factura es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      /*} else if (this.Tipo == undefined || this.Tipo == null || this.Tipo == '0') {
        this.Respuesta = 'El filtro tipo es obligatorio.';
        this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })*/
    } else if (this.Prefjo == undefined || this.Prefjo == null || this.Prefjo == '') {
      this.Respuesta = 'El filtro prefijo es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else {
      const Body = {
        Reg: auxReg,
        NumFac: auxNumroFactura,
        Tipo: 'fc',
        Prefijo: auxPrefjo
      }
      this.facturaServices.ConsultaXml(Body).subscribe(Resultado => {

        this.VerOcultarTargetXML = true;
        this.Xml = Resultado;

      })
    }
  }

  LimpiarXml() {
    this.Reg = '';
    this.NumroFactura = '';
    this.Tipo = '0';
    this.Prefjo = '';
    this.Xml = '';
    this.VerOcultarTargetXML = false;
  }

  BuscarFactura() {
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
        this.VerOcultarCamposTarget = true;
        this.verOcultarPge = true;
        this.verOcultarLabel = false;
      } else {
        this.verOcultarPge = false;
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
    var auxRangoIni = this.formatofecha.transform(this.arregloListaFactura[0].RangoFecIni, "yyyy/MM/dd")!;
    var auxRangofIN = this.formatofecha.transform(this.arregloListaFactura[0].RangoFecFin, "yyyy/MM/dd")!;

    if (this.arregloListaFactura[0].NumResolucion == undefined || this.arregloListaFactura[0].NumResolucion == null || this.arregloListaFactura[0].NumResolucion == '') {
      this.Respuesta = 'El filtro Número resolución es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.arregloListaFactura[0].Usuario == undefined || this.arregloListaFactura[0].Usuario == null || this.arregloListaFactura[0].Usuario == '') {
      this.Respuesta = 'El filtro Usuario es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.arregloListaFactura[0].Contrasena == undefined || this.arregloListaFactura[0].Contrasena == null || this.arregloListaFactura[0].Contrasena == '') {
      this.Respuesta = 'El filtro Contraseña es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.arregloListaFactura[0].Prefijo == undefined || this.arregloListaFactura[0].Prefijo == null || this.arregloListaFactura[0].Prefijo == '') {
      this.Respuesta = 'El filtro prefijo es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.arregloListaFactura[0].PrefijoNC == undefined || this.arregloListaFactura[0].PrefijoNC == null || this.arregloListaFactura[0].PrefijoNC == '') {
      this.Respuesta = 'El filtro Prefijo nota credito es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.arregloListaFactura[0].RangoD == undefined || this.arregloListaFactura[0].RangoD == null || this.arregloListaFactura[0].RangoD == '') {
      this.Respuesta = 'El filtro Rango desde es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.arregloListaFactura[0].RangoH == undefined || this.arregloListaFactura[0].RangoH == null || this.arregloListaFactura[0].RangoH == '') {
      this.Respuesta = 'El filtro Rango hasta es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.arregloListaFactura[0].RangoFecIni == undefined || this.arregloListaFactura[0].RangoFecIni == null || this.arregloListaFactura[0].RangoFecIni == '') {
      this.Respuesta = 'El filtro Rango fecha inicio es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.arregloListaFactura[0].RangoFecFin == undefined || this.arregloListaFactura[0].RangoFecFin == null || this.arregloListaFactura[0].RangoFecFin == '') {
      this.Respuesta = 'El filtro Rango fecha fin es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.arregloListaFactura[0].RangoNCD == undefined || this.arregloListaFactura[0].RangoNCD == null || this.arregloListaFactura[0].RangoNCD == '') {
      this.Respuesta = 'El filtro Rango nota credito desde es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.arregloListaFactura[0].RangoNCH == undefined || this.arregloListaFactura[0].RangoNCH == null || this.arregloListaFactura[0].RangoNCH == '') {
      this.Respuesta = 'El filtro Rango nota credito hasta es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else {


      const body = {
        NumResolucion: this.arregloListaFactura[0].NumResolucion,
        Usuario: this.arregloListaFactura[0].Usuario,
        Contrasena: this.arregloListaFactura[0].Contrasena,
        Prefijo: this.arregloListaFactura[0].Prefijo,
        RangoD: this.arregloListaFactura[0].RangoD,
        RangoH: this.arregloListaFactura[0].RangoH,
        RangoFecIni: auxRangoIni,
        RangoFecFin: auxRangofIN,
        PrefijoNC: this.arregloListaFactura[0].PrefijoNC,
        RangoNCD: this.arregloListaFactura[0].RangoNCD,
        RangoNCH: this.arregloListaFactura[0].RangoNCH,
        NumFacturaAct: this.arregloListaFactura[0].NotaCreditoActual,
        Nit: this.arregloListaFactura[0].Nit
      }
      this.facturaServices.ActFacturacion(body).subscribe(Resultado => {
        this.Respuesta = Resultado;
        this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
        this.facturaServices.InsertLogUsers("Habilita empresa facturacion", "ActFacturacion " + Resultado);
        this.LimpiarFormularioAct();
        this.ConsultaFactura();

      })
    }
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

  copiarXml(input: any) {
    input.select();
    document.execCommand('copy');
    input.setSelectRange();

  }
}
