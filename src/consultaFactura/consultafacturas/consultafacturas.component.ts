import { DATE_PIPE_DEFAULT_TIMEZONE, NumberSymbol } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FacturacionService } from 'src/app/core/facturacion.service';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-consultafacturas',
  templateUrl: './consultafacturas.component.html',
  styleUrls: ['./consultafacturas.component.css']
})

export class ConsultafacturasComponent implements OnInit {

  constructor(private servicioConFacturas:FacturacionService, private servicioModDocFacturas:FacturacionService, private modalPdf:NgbModal, private modalXml:NgbModal, private modalError:NgbModal, private modalActualizacion:NgbModal, private sanitizer: DomSanitizer) {

   }

  transform(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  NitEmpresa: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  numeroFactura:string = '';
  resultadoConFacturas: any = [];
  resultadoModDocFacturas:any = [];
  urlPdf: any;
  urlXml: any;
  mostrarTabla:boolean = false;
  mensajePopUp:string = '';
  splitModDocFacturas:any = [];

  ngOnInit(): void {
  }

  consultaFacturas (popUpError:any) {
    if (this.NitEmpresa == '') {
      this.mensajePopUp = "Señor usuario, por favor ingrese al menos el numero de Nit de la empresa que desea buscar.";
      this.modalError.open(popUpError, {size:'md'});
    } else {
      var auxNitEmpresa: string = '';
      var auxFechaInicio:string = '';
      var auxFechaFin:string = '';
      var auxNumeroFactura:number = 0;
  
      if (this.NitEmpresa == '') {
        auxNitEmpresa = '0';
      } else {
        auxNitEmpresa = this.NitEmpresa;
      }
      if (this.fechaInicio == '') {
        auxFechaInicio = '0';
      } else {
        auxFechaInicio = this.fechaInicio;
      }
      if (this.fechaFin == '') {
        auxFechaFin = '0';
      } else {
        auxFechaFin = this.fechaFin;
      }
      if (this.numeroFactura == '') {
        auxNumeroFactura = 0;
      } else {
        auxNumeroFactura = Number(this.numeroFactura);
      }

      this.servicioConFacturas.ConFacturas(auxNitEmpresa, auxFechaInicio, auxFechaFin, auxNumeroFactura).subscribe(registroConFacturas =>{
        this.resultadoConFacturas = registroConFacturas;
        if (this.resultadoConFacturas.length > 0) {
          this.mostrarTabla = true;
        } else {
          this.mensajePopUp = "No existen registros con el numero ingresado Nit";
          this.modalError.open(popUpError, {size:'md'});
        }
      })
    }
  }

  limpiarConsulta (){
    this.NitEmpresa = '';
    this.fechaInicio = '';
    this.fechaFin = '';
    this.numeroFactura = '';
    this.mostrarTabla = false;
  }

  abrirAccionPdf (popUpAccionPdf:any, UrlPdf:any) {
    this.urlPdf = this.sanitizer.bypassSecurityTrustResourceUrl(UrlPdf);
    this.modalPdf.open(popUpAccionPdf,{size:'xl'});
  }

  abrirAccionXml (popUpAccionXml:any, UrlXml:any) {
    this.urlXml = this.sanitizer.bypassSecurityTrustResourceUrl(UrlXml);
    this.modalXml.open(popUpAccionXml, {size:'xl'});
  }

  modalActualizar (popUpActualizacion:any, result:any){
    this.servicioModDocFacturas.ModDocumentacionFacturas(2, result.NitEmpresa, result.NumeroFactura).subscribe(registroModDocFacturas => {
      this.resultadoModDocFacturas = registroModDocFacturas;
      this.splitModDocFacturas = this.resultadoModDocFacturas.split("|");
      if (Number(this.splitModDocFacturas[0])>0) {
        this.mensajePopUp = "Registro actualizado. Recuerde que los documentos se mostraran en cinco minutos.";
        this.modalActualizacion.open(popUpActualizacion, {size:'md'});
      } else {
        this.mensajePopUp = "No se han podido actualziar los documentos. Por favor, comuníquese lo más pronto posible con soporte.";
        this.modalActualizacion.open(popUpActualizacion, {size:'md'});
      }
    })
  }
}
