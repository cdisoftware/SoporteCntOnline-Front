import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FacturacionService } from 'src/app/core/facturacion.service';
import { EmpresasService } from 'src/app/core/empresas.service';

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

  constructor(public rutas: Router,
    private modalService: NgbModal,
    public facturaServices: FacturacionService,
    public empresaService: EmpresasService) { }

  ngOnInit(): void {
  }

  HabilitarDoc() {
    this.VerOcultarConsulta = false;
    this.VerOcultarActualizar = true;
    this.VerOcultarCamposTarget = false;
    this.VerOcultarFormAct = false;
    this.verOcultarLabel = false;

  }


  BuscarFactura() {

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
    const body = {
      NumResolucionDS: this.arregloListaDoc[0].NumResolucionDS,
      PrefijoDS:  this.arregloListaDoc[0].PrefijoDS,
      RangoDS_D: this.arregloListaDoc[0].RangoDS_D,
      RangoDS_H: this.arregloListaDoc[0].RangoDS_H,
      FechaInicioDS: this.arregloListaDoc[0].FechaInicioDS,
      FechaFinDS: this.arregloListaDoc[0].FechaFinDS,
      Nit: this.arregloListaDoc[0].Nit
    }
    console.log(body)
    this.facturaServices.ActDocSoporte(body).subscribe(Resultado => {
      this.Respuesta = Resultado;
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.LimpiarActDoc();
      this.Cancelar();
    })
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

}
