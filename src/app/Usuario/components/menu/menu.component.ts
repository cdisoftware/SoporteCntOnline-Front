import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MetodosglobalesService } from 'src/app/core/metodosglobales.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  NombreUser: string = "";
  NombreUsu: string = '';
  IdUser: string = '';
  constructor(private modalService: NgbModal,
    private cookie: MetodosglobalesService,
    public router: Router) {
    //cookies nombre usuario
    this.NombreUsu = this.cookie.GetCookie('NombreUser');
    this.IdUser = this.cookie.GetCookie('IdUser');
  }

  ngOnInit(): void {
    if (this.IdUser == '') {
      this.router.navigate(['']);
    }
  }

  CerrarSesion(templateConfirmacion: any) {
    this.modalService.open(templateConfirmacion);
  }
  AceptCerrarSesion() {
    this.modalService.dismissAll();
    this.cookie.DeleteCookie();
    this.router.navigate(['']);
  }

  atras() {
    this.router.navigate(['home']);
  }
}
