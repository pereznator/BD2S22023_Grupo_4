import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

import { cliente } from './response';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: "root"
})
export class ApiHandle {

  constructor(private httpClient: HttpClient) { }

  private API_URL = environment.api_url

  getClientes(){
    return this.httpClient.get<Array<cliente>>(`${this.API_URL}/clientes`)
  }

  login(nombre: string, ){
    this.getClientes().subscribe((response) => {
      console.log(response)
    }, (error)=> {
    })
  }
}
