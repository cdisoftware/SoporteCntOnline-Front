import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FacturacionService } from 'src/app/core/facturacion.service';
import { EmpresasService } from 'src/app/core/empresas.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css']
})
export class DocumentoComponent implements OnInit {

  Respuesta: string = '';

  NitEmpresa: string = '';
  NumFactura: string = '';
  Regnal: string = '';
  Pfjo: string = '';

  VerOcultarConsulta: boolean = false;
  VerOcultarActualizar: boolean = false;
  VerOcultarCamposTarget: boolean = false;
  VerOcultarFormAct: boolean = false;
  verOcultarLabel: boolean = false;

  arregloListaDoc: any;
  NitDoc: string = '';

  verOcultarXML: boolean = false;
  Reg: string = '';
  folio: string = '';
  Prefjo: string = '';
  VerOcultarTargetXML: boolean = false;
  Xml: string = '';

  constructor(public rutas: Router,
    private modalService: NgbModal,
    public facturaServices: FacturacionService,
    public empresaService: EmpresasService,
    private formatofecha: DatePipe) { }

  ngOnInit(): void {
  }

  HabilitarDoc() {
    this.VerOcultarConsulta = false;
    this.VerOcultarActualizar = true;
    this.VerOcultarCamposTarget = false;
    this.VerOcultarFormAct = false;
    this.verOcultarLabel = false;
    this.verOcultarXML = false;
    this.VerOcultarTargetXML = false;
    this.LimpiarXml();
    this.NitDoc = '';
  }

  GenXml() {
    this.VerOcultarConsulta = false;
    this.VerOcultarActualizar = false;
    this.VerOcultarCamposTarget = false;
    this.VerOcultarFormAct = false;
    this.verOcultarLabel = false;
    this.verOcultarXML = true;
    this.VerOcultarTargetXML = false;
  }
  BuscarXML(templateMensaje: any) {
    var auxReg = this.Reg;
    var auxFolio = this.folio;
    var auxPrefjo = this.Prefjo;

    if (this.Reg == undefined || this.Reg == null || this.Reg == '') {
      this.Respuesta = 'El filtro regional es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.folio == undefined || this.folio == null || this.folio == '') {
      this.Respuesta = 'El filtro folio es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.Prefjo == undefined || this.Prefjo == null || this.Prefjo == '') {
      this.Respuesta = 'El filtro prefijo es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else {
      const Body = {
        Regional:auxReg,
        Folio:auxFolio,
        Prefijo:auxPrefjo
      }
      console.log(Body)
      this.facturaServices.ConsultaXmlDoc(Body).subscribe(Resultado => {
        console.log(Resultado)
        this.Xml = Resultado;
        this.VerOcultarTargetXML = true;
      })
    }
  }

  LimpiarXml() {
    this.Reg = '';
    this.folio = '';
    this.Prefjo = '';
    this.VerOcultarTargetXML = false;
  }

  BuscarHabNomina() {
    this.verOcultarLabel = false;
    var auxNit: string = '';
    if (this.NitDoc == '') {
      auxNit = '1';
    } else {
      auxNit = this.NitDoc;
    }
    this.empresaService.ConsultaEmpresas(auxNit, '0', '0').subscribe(Resultado => {
      if (Resultado != null && Resultado != undefined && Resultado != '') {
        this.arregloListaDoc = Resultado;
        this.VerOcultarFormAct = true;
        this.NitDoc = '';
      } else {
        this.verOcultarLabel = true;
        this.arregloListaDoc = [];
      }
    })
  }

  ActualizarDocumento(templateMensaje: any) {
    var auxFechaInicioDS = this.formatofecha.transform(this.arregloListaDoc[0].FechaInicioDS, "yyyy/MM/dd")!;
    var auxFechaFinDS = this.formatofecha.transform(this.arregloListaDoc[0].FechaFinDS, "yyyy/MM/dd")!;

    if (this.arregloListaDoc[0].NumResolucionDS == undefined || this.arregloListaDoc[0].NumResolucionDS == null || this.arregloListaDoc[0].NumResolucionDS == '') {
      this.Respuesta = 'El filtro número resolución documento soporte es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.arregloListaDoc[0].RangoDS_D == undefined || this.arregloListaDoc[0].RangoDS_D == null || this.arregloListaDoc[0].RangoDS_D == '') {
      this.Respuesta = 'El filtro rango desde es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.arregloListaDoc[0].RangoDS_H == undefined || this.arregloListaDoc[0].RangoDS_H == null || this.arregloListaDoc[0].RangoDS_H == '') {
      this.Respuesta = 'El filtro rango hasta es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.arregloListaDoc[0].FechaInicioDS == undefined || this.arregloListaDoc[0].FechaInicioDS == null || this.arregloListaDoc[0].FechaInicioDS == '') {
      this.Respuesta = 'El filtro rango fecha inicio es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.arregloListaDoc[0].FechaFinDS == undefined || this.arregloListaDoc[0].FechaFinDS == null || this.arregloListaDoc[0].FechaFinDS == '') {
      this.Respuesta = 'El filtro rango fecha fin es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.arregloListaDoc[0].PrefijoDS == undefined || this.arregloListaDoc[0].PrefijoDS == null || this.arregloListaDoc[0].PrefijoDS == '') {
      this.Respuesta = 'El filtro prefijo es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else {
      const body = {
        NumResolucionDS: this.arregloListaDoc[0].NumResolucionDS,
        PrefijoDS: this.arregloListaDoc[0].PrefijoDS,
        RangoDS_D: this.arregloListaDoc[0].RangoDS_D,
        RangoDS_H: this.arregloListaDoc[0].RangoDS_H,
        FechaInicioDS: auxFechaInicioDS,
        FechaFinDS: auxFechaFinDS,
        Nit: this.arregloListaDoc[0].Nit
      }
      this.facturaServices.ActDocSoporte(body).subscribe(Resultado => {
        this.Respuesta = Resultado;
        this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
        this.facturaServices.InsertLogUsers();
        this.LimpiarActDoc();
        this.Cancelar();
        
      })
    }
  }

  LimpiarActDoc() {
    this.arregloListaDoc[0].NumResolucionDS = '';
    this.arregloListaDoc[0].RangoDS_D = '';
    this.arregloListaDoc[0].RangoDS_H = '';
    this.arregloListaDoc[0].FechaInicioDS = '';
    this.arregloListaDoc[0].FechaFinDS = '';
    this.arregloListaDoc[0].PrefijoDS = '';
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
    input.setSelectRange(0,0);
   
  }
}
