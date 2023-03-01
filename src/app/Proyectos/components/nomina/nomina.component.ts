import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FacturacionService } from 'src/app/core/facturacion.service';
import { EmpresasService } from 'src/app/core/empresas.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-nomina',
  templateUrl: './nomina.component.html',
  styleUrls: ['./nomina.component.css']
})
export class NominaComponent implements OnInit {

  Respuesta: string = '';

  NitEmpresa: string = '';
  NumFactura: string = '';
  Regnal: string = '';
  Pfjo: string = '';
  NitNom: string = '';

  VerOcultarConsulta: boolean = false;
  VerOcultarActualizar: boolean = false;
  VerOcultarCamposTarget: boolean = false;
  VerOcultarFormAct: boolean = false;
  verOcultarLabel: boolean = false;
  VerOcultarXmlNom: boolean = false;

  arregloNomina: any;

  Reg: string = '';
  fechaIni: string = '';
  fechaFin: string = '';


  //XmlNomina
  ArrSplit: any = [];
  ArrNomina: any = [];
  VerRespuXml: boolean = false;

  //VerTxt
  Xml: string = '';
  DocUsu: string = "";

  constructor(public rutas: Router,
    private modalService: NgbModal,
    public facturaServices: FacturacionService,
    public empresaService: EmpresasService,
    private formatofecha: DatePipe) { }

  ngOnInit(): void {
  }
  ConsultaXmlNom() {
    this.VerOcultarConsulta = true;
    this.VerOcultarActualizar = false;
    this.VerOcultarCamposTarget = false;
    this.VerOcultarFormAct = false;
    this.verOcultarLabel = false;
  }

  HabilitarNomina() {
    this.VerOcultarConsulta = false;
    this.VerOcultarActualizar = true;
    this.VerOcultarCamposTarget = false;
    this.VerOcultarFormAct = false;
    this.verOcultarLabel = false;
  }

  BuscarXml(ModalRespuesta: any) {
    var fechai = this.fechaIni.split("-");
    var auxfechaIni = fechai[0] + "-" + fechai[1] + "-" + fechai[2];


    var fechaf = this.fechaFin.split("-");
    var auxfechaFin = fechaf[0] + "-" + fechaf[1] + "-" + fechaf[2];

    if (fechai[0] == "" || fechai[0] == undefined) {
      this.Respuesta = "La fecha inicio no esta diligenciada valide su información.";
      this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (fechaf[0] == "" || fechaf[0] == undefined) {
      this.Respuesta = "La fecha fin no esta diligenciada valide su información.";
      this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.Reg == "") {
      this.Respuesta = "El regional no esta diligenciada valide su información.";
      this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else {

      const Body = {
        Regional: this.Reg,
        FechaI: auxfechaIni,
        FechaF: auxfechaFin
      }
      this.facturaServices.ConsultaXmlNomina(Body).subscribe(Resultado => {
        if (Resultado != "No fue posible encontrar el archivo si esta incidencia persiste comunícate con el área de administración") {
          this.VerRespuXml = true;
          this.ArrSplit = Resultado.split("|");
          this.llenaArrayNominas(this.ArrSplit);
        } else {
          this.VerRespuXml = false;
          this.Respuesta = Resultado;
          this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
        }
      })
    }
  }
  llenaArrayNominas(Arr: any) {
    this.ArrNomina = [];

    for (var i = 0; i < Arr.length; i++) {
      var splitNom = Arr[i].split("@");
      var Nom = splitNom[0];
      var Doc = splitNom[1];

      this.ArrNomina.push({ Documento: Doc, NominaInD: Nom })
    }
  }


  ConsTxtNomUsu(Arr: any, ModaltxtNom: any) {
    this.DocUsu = Arr.Documento;
    this.Xml = Arr.NominaInD;
    this.modalService.open(ModaltxtNom, { ariaLabelledBy: 'modal-basic-title', size: 'xl' })
  }



  LimpiarXml() {
    this.ArrNomina = [];
    this.VerRespuXml = false;
    this.Reg = '';
    this.fechaIni = '';
    this.fechaFin = '';
  }

  BuscarHabNomina() {
    this.verOcultarLabel = false;
    var auxNit: string = '';
    if (this.NitNom == '') {
      auxNit = '1';
    } else {
      auxNit = this.NitNom;
    }
    this.empresaService.ConsultaEmpresas(auxNit, '0', '0').subscribe(Resultado => {
      if (Resultado != null && Resultado != undefined && Resultado != '') {
        this.arregloNomina = Resultado;
        this.VerOcultarFormAct = true;
        this.NitNom = '';
      } else {
        this.verOcultarLabel = true;
        this.arregloNomina = [];
      }
    })
  }

  ActualizarNomina(templateMensaje: any) {

    if (this.arregloNomina[0].ContrasenaNE == undefined || this.arregloNomina[0].ContrasenaNE == null || this.arregloNomina[0].ContrasenaNE == '') {
      this.Respuesta = 'El filtro Contraseña Nómina electrónica es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.arregloNomina[0].PrefijoNE == undefined || this.arregloNomina[0].PrefijoNE == null || this.arregloNomina[0].PrefijoNE == '') {
      this.Respuesta = 'El filtro Prefijo nomina electronica es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.arregloNomina[0].PrefijoNA == undefined || this.arregloNomina[0].PrefijoNA == null || this.arregloNomina[0].PrefijoNA == '0') {
      this.Respuesta = 'El filtro Prefijo nota ajuste es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.arregloNomina[0].RangoNED == undefined || this.arregloNomina[0].RangoNED == null || this.arregloNomina[0].RangoNED == '') {
      this.Respuesta = 'El filtro Rango nomina electronica desde es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.arregloNomina[0].RangoNEH == undefined || this.arregloNomina[0].RangoNEH == null || this.arregloNomina[0].RangoNEH == '') {
      this.Respuesta = 'El filtro Rango nomina electronica hasta es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else {

      const body = {
        PrefijoNE: this.arregloNomina[0].PrefijoNE,
        RangoNED: this.arregloNomina[0].RangoNED,
        RangoNEH: this.arregloNomina[0].RangoNEH,
        ContrasenaNE: this.arregloNomina[0].ContrasenaNE,
        PrefijoNA: this.arregloNomina[0].PrefijoNA,
        Nit: this.arregloNomina[0].Nit
      }
      this.facturaServices.ActualizaNomina(body).subscribe(Resultado => {
        this.Respuesta = Resultado;
        this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
        this.facturaServices.InsertLogUsers("Habilita empresa nomina","ActNomina "+ Resultado);
        this.LimpiarActNom();
        this.Cancelar();

      })
    }
  }

  LimpiarActNom() {
    this.arregloNomina[0].ContrasenaNE = '';
    this.arregloNomina[0].PrefijoNE = '';
    this.arregloNomina[0].PrefijoNA = '';
    this.arregloNomina[0].RangoNED = '';
    this.arregloNomina[0].RangoNEH = '';
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
