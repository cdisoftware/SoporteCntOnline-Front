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
  Tipo: string = '';
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

  BuscarXML() {
    var auxReg: string = '';
    var auxNumroFactura: string = '';
    var auxTipo: string = '';
    var auxPrefjo: string = '';
    if (this.Reg == '') {
      auxReg = '0';
    } else {
      auxReg = this.Reg;
    }
    if (this.NumroFactura == '') {
      auxNumroFactura = '0';
    } else {
      auxNumroFactura = this.NumroFactura;
    }
    if (this.Tipo == '') {
      auxTipo = '0';
    } else {
      auxTipo = this.Tipo;
    }
    if (this.Prefjo == '') {
      auxPrefjo = '0';
    } else {
      auxPrefjo = this.Prefjo;
    }
    const Body = {
      Reg: auxReg,
      NumFac: auxNumroFactura,
      Tipo: auxTipo,
      Prefijo: auxPrefjo
    }
    this.facturaServices.ConsultaXml(Body).subscribe(Resultado => {
      console.log(Resultado)
      this.Xml = Resultado;
      this.verOcultarXML = true;
    })
  }

  LimpiarXml() {
    this.Reg = '';
    this.NumroFactura = '';
    this.Tipo = '';
    this.Prefjo = '';

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

    var rangoIni = this.RangoFecIni;
    var rangoFin = this.RangoFecFin;

    var auxRangoIni = this.formatofecha.transform(rangoIni, "yyyy-MM-dd")!;
    var auxRangoIni = this.formatofecha.transform(rangoFin, "yyyy-MM-dd")!;


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
    this.facturaServices.ActFacturacion(body).subscribe(Resultado => {
      this.Respuesta = Resultado;
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.LimpiarFormularioAct();
      this.ConsultaFactura();
    })

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
