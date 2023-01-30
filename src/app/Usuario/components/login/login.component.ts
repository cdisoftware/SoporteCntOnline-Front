import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  imagen: string = '';

  constructor() { }

  ngOnInit(): void {
    this.imagen = "fa fa-eye";
  }

  login(templateMensaje: any){

  }

  ocultarPass() {
    let elemento: any = document.getElementById('Password');
    if (this.imagen == "fa fa-eye") {
      elemento.type = "text";
      this.imagen = "fa fa-eye-slash"
    } else if (this.imagen == "fa fa-eye-slash") {
      elemento.type = "password";
      this.imagen = "fa fa-eye"
    }
  }
}
