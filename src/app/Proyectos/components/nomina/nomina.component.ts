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
  Xml: string = '';

  //XmlNomina
  ArrSplit: any = [];
  ArrNomina: any = [];

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

  BuscarXml() {
    var fechai = this.fechaIni;
    var fechaf = this.fechaFin;
    var auxReg: string = '';
    var auxfechaIni = this.formatofecha.transform(fechai, "yyyy-MM-dd")!;
    var auxfechaFin = this.formatofecha.transform(fechaf, "yyyy-MM-dd")!;

    if (this.Reg == '') {
      auxReg = '0';
    } else {
      auxReg = this.Reg;
    }
    if (this.fechaIni == '') {
      auxfechaIni = '0';
    } else {
      auxfechaIni = this.fechaIni;
    }
    if (this.fechaFin == '') {
      auxfechaFin = '0';
    } else {
      auxfechaFin = this.fechaFin;
    }
    const Body = {
      Regional: auxReg,
      FechaI: auxfechaIni,
      FechaF: auxfechaFin
    }
    this.facturaServices.ConsultaXmlNomina(Body).subscribe(Resultado => {
      this.Xml = Resultado;
      this.ArrSplit = Resultado.split("|");
      this.llenaArrayNominas(this.ArrSplit);
    })
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




  LimpiarXml() {
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
      this.LimpiarActNom();
      this.Cancelar();
    })
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

}
