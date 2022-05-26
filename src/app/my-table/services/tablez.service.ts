import { Injectable } from '@angular/core';
import {Pessoa} from '../model/Pessoa.model';
import {Responsez} from '../model/Responsez.model';
import { HttpClient } from '@angular/common/http';
import { delay, first, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TablezService {

  private readonly API = 'api/pessoa';//'localhost:8080/pessoa';
  //private readonly API ='localhost:8080/api/pessoa';
  constructor(private httpClient:HttpClient) {

  }
  list(page:number) {
    var paginate : string = "";
    if(page!==0){
      paginate = "?page="+page;
    }
    
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
    /*
    var kk : any = this.httpClient.get<any>(this.API+paginate, { params: {
      lat: "merda",
      long: "algo"
    }}).pipe(
      map(res => {
        return JSON.parse(res);
      })
    );
    //console.log(kk);
      */
    var kk : String;
    return this.httpClient.get<String>(this.API+paginate)
    .pipe(
      first(),
      
      /*
      map(res => {
        //kk = res.content;
        console.log( res);
      })
      */
      //delay(15000),
      //tap(pessoas => console.log(pessoas))
    );
    //console.log(kk);
  }
}
