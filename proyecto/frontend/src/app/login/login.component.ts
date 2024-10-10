import { Component, OnInit } from '@angular/core';
import { FormControl, Validator, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiHandle } from 'src/services/api.handle.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: FormControl = new FormControl('', [Validators.required])
  constructor(private apiHandle: ApiHandle, private router: Router) { }

  ngOnInit() {
  }

  onClickLogin(){
    this.apiHandle.getClientes().subscribe((response) => {
      console.log(response)
      response.forEach((cliente)=> {
        if (cliente.nombre == this.usuario.value) {
          this.router.navigate(['/admin'])
        }
      })
    }, (error)=> {
      console.log(error)
    })
  }

}
