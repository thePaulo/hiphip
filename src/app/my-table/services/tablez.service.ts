import { Injectable } from '@angular/core';
import {Pessoa} from '../model/Pessoa.model';
import { HttpClient } from '@angular/common/http';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TablezService {

  private readonly API = 'api/pessoa';//'localhost:8080/pessoa';

  constructor(private httpClient:HttpClient) {

  }
  list() {
    return this.httpClient.get<Pessoa[]>(this.API)
    .pipe(
      first(),
      //delay(15000),
      tap(pessoas => console.log(pessoas))
    );
    /*return [
      {id: 1, nome: 'Hydrogen'}
    ];*/
  }
}
