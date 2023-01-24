import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  ocultarPass() {
    let elemento: any = document.getElementById('Password');
    let icon: any = document.getElementById('pass');
    if (icon.setAttribute('class', 'fa fa-eye') == icon.setAttribute('class', 'fa fa-eye')) {
      elemento.type = "text";
      icon.setAttribute('class', 'fa fa-eye-slash')

    } else {
      alert("ok")
      elemento.type = "password";
      icon.setAttribute('class', 'fa fa-eye');
    }
  }
}
