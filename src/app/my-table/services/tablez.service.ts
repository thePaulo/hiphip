import { Injectable } from '@angular/core';
import {Pessoa} from '../model/Pessoa.model';
import { HttpClient } from '@angular/common/http';
import { delay, first, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TablezService {

  private readonly API = 'api/pessoa';//'localhost:8080/pessoa';

  constructor(private httpClient:HttpClient) {

  }
  list(page:number) {
    var paginate : string = "";
    if(page!==0){
      paginate = "?page="+page;
    }
    
    console.log("AQUI ABAIXO");
    //console.log(this.httpClient.get<Pessoa[]>(this.API+paginate).pipe(map(res => {
    //  return JSON.parse(res);
    //})));

    /*
    console.log(this.httpClient.get<any>(this.API+paginate, { params: {
      lat: "merda",
      long: "algo"
    }}).pipe(
      map(res => {
        return JSON.parse(res);
      })
    ));
    */
    var kk : any = this.httpClient.get<any>(this.API+paginate, { params: {
      lat: "merda",
      long: "algo"
    }}).pipe(
      map(res => {
        return JSON.parse(res);
      })
    );
    //console.log(kk);

    
    return this.httpClient.get<Pessoa[]>(this.API+paginate)
    .pipe(
      first(),
      //delay(15000),
      tap(pessoas => console.log(pessoas))
    );
    
  }
}
