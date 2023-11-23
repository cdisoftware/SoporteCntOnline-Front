import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FacturacionService } from 'src/app/core/facturacion.service';
import {DomSanitizer} from "@angular/platform-browser";
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-nomina-electronica',
  templateUrl: './nomina-electronica.component.html',
  styleUrls: ['./nomina-electronica.component.css']
})
export class NominaElectronicaComponent implements OnInit {

  constructor(private ConsNominasServicio:FacturacionService, private ModDocuNominas:FacturacionService, private ModalError:NgbModal, private ModalPdf:NgbModal, private ModalXml:NgbModal, private ModalActualizar:NgbModal, private ModalErrorAccion:NgbModal, private Sanitizer:DomSanitizer) {

  }

  ngOnInit(): void {
  }

  Usuario:string = '';
  FechaInicio: string = '';
  FechaFin:string = '';
  Empleado:string = '';
  resultNominaElectronica:any = [];
  MensajePopUp:string = '';
  MensajePopUpError:string = '';
  MostrarTabla:boolean = false;
  EnlacePdf: any;
  EnlaceXml: any;
  ResultModNominaElec:any = [];
  SplitModNominaElec:any = [];
  SplitEnlaceUrl:any = [];
  SplitEnlacePdf:any = [];
  EnlaceXmlUni: any;
  EnlacePdfUni: any;

  consNominaElectronica (PopUpError:any) {
    if (this.Usuario != '' && this.FechaInicio != '' && this.FechaFin != '') {
      var AuxEmpleado:string = '';

      if (this.Empleado == '') {
        AuxEmpleado = '0';
      } else {
        AuxEmpleado = this.Empleado;
      }

      const body = {
        FechaInicio: this.FechaInicio,
        FechaFinal: this.FechaFin,
        Empleado: AuxEmpleado
      }
      this.ConsNominasServicio.ConsNominas(this.Usuario, body).subscribe(registroConsNominas => {
        this.resultNominaElectronica = registroConsNominas;
        console.log(this.resultNominaElectronica);
        if (this.resultNominaElectronica.length > 0) {
          this.MostrarTabla = true;
        } else {
          this.MensajePopUp = "No se encuentran registros de acuerdo a la identificación del usuario, fecha de inicio y fecha de fin."
          this.ModalError.open(PopUpError, {size:'md'})
        }
      });
    } else {
      this.MensajePopUp = "Señor usuario, por favor ingrese la identificación del usuario, la fecha de inicio y la fecha de fin.";
      this.ModalError.open(PopUpError, {size: 'md'});
    }
  }

  BtnLimpiar () {
    this.Usuario = '';
    this.FechaInicio = '';
    this.FechaFin = '';
    this.Empleado = '';
    this.MostrarTabla = false;
  }
  
  AbrirAccionPdf (PopUpAccionPdf:any, PopUpErrorAcciones:any, UrlPdf:any) { 
    this.EnlacePdf = this.Sanitizer.bypassSecurityTrustResourceUrl(UrlPdf);
    this.SplitEnlacePdf = UrlPdf.split('https://api.apptotrip.com');
    this.EnlacePdfUni = this.SplitEnlacePdf[1];

    fetch(this.EnlacePdfUni).then(response => {
      if (response.status == 404) {
        this.MensajePopUpError = "Lastimosamente no se ha podido descargar el archivo PDF, por favor de click en el botón actualizar para recargar el archivo.";
        this.ModalErrorAccion.open(PopUpErrorAcciones, {size:'lg'})
      }  else {
        this.ModalXml.open(PopUpAccionPdf, {size:'lg'});
      }
    });
  }

  AbrirAccionXml (PopUpAccionXml:any, PopUpErrorAcciones:any, UrlXml:any) {
    this.EnlaceXml = this.Sanitizer.bypassSecurityTrustResourceUrl(UrlXml);
    this.SplitEnlaceUrl = UrlXml.split('https://api.apptotrip.com');
    this.EnlaceXmlUni = this.SplitEnlaceUrl[1];
    
    fetch(this.EnlaceXmlUni).then(response => {
      if (response.status == 404) {
        this.MensajePopUpError = "Lastimosamente no se ha podido descargar el archivo XML, por favor de click en el botón actualizar para recargar el archivo.";
        this.ModalErrorAccion.open(PopUpErrorAcciones, {size:'lg'})
      }  else {
        this.ModalXml.open(PopUpAccionXml, {size:'lg'});
      }
    });
  }

  AbrirModalActualizar (PopUpActualizar:any, resultNE:any) {
    const body = {
      Usuario: resultNE.Usuario,
      Empleado: resultNE.Empleado,
      Folio: resultNE.Folio
    }
    this.ModDocuNominas.ModDocumentacionNominas('2', body).subscribe(RegistroActualizar => {
      this.ResultModNominaElec = RegistroActualizar;
      console.log (this.ResultModNominaElec);
      this.SplitModNominaElec = this.ResultModNominaElec.split('|');
      if (Number(this.SplitModNominaElec[0]) > 0) {
        this.MensajePopUp = "Registro actualizado. Recuerde que los documentos se mostraran en cinco minutos.";
        this.ModalActualizar.open(PopUpActualizar, {size:'md'});
      } else {
        this.MensajePopUp = "No se han podido actualziar los documentos. Por favor, comuníquese lo más pronto posible con soporte.";
        this.ModalActualizar.open(PopUpActualizar, {size:'md'});
      }
    });
  }
}

