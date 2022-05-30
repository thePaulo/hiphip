import { Inject, Injectable } from '@angular/core';
import {Pessoa} from '../model/Pessoa.model';
import {Responsez} from '../model/Responsez.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSort, Sort } from '@angular/material/sort';
import { delay, first, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TablezService {

  private readonly API = 'api/pessoa';
  //private readonly API ='http://localhost:8080/api/pessoa';
  public auth =" '' ";
  private headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Authorization': this.auth//'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJFeGVtcGxvSldUIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE2NTM4NDAwNDMsImV4cCI6MTY1MzkyNjQ0M30.pOWLISeRm7qXp2ZTcniIxYUC163D2T5rwSutzO4Osh8'
  }
  private requestOptions = {};

  constructor(@Inject(HttpClient) private httpClient:HttpClient) {

    var validateLocal:string | null = localStorage.getItem('auth');
    if(validateLocal){
      this.auth = validateLocal;
    }
    this.headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': this.auth//'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJFeGVtcGxvSldUIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE2NTM4NDAwNDMsImV4cCI6MTY1MzkyNjQ0M30.pOWLISeRm7qXp2ZTcniIxYUC163D2T5rwSutzO4Osh8'
    }
    this.requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(this.headerDict), 
    };
    console.log(this.auth);
  }
  list(page:number,sorting:Sort) {

    var paginate : string = "";
    paginate = "?page="+page;
    var sort : string = "&sort="+sorting.active+","+sorting.direction;
    
    
    return this.httpClient.get<String>(this.API+paginate+sort,this.requestOptions)
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
  }

  delete(id:number){
    return this.httpClient.delete(this.API+"/"+id.toString(),this.requestOptions);
  }
  create(p:Pessoa){
    return this.httpClient.post<Pessoa>(this.API, p,this.requestOptions);
  }
  update(id:number, p:Pessoa): Observable<Pessoa> {
    console.log(JSON.stringify(p));
    return this.httpClient.put<Pessoa>(this.API + '/' + id,p,this.requestOptions)
  }
  getOne(id:String){
    return this.httpClient.get<String>(this.API+'/'+id,this.requestOptions)
    .pipe(
      first(),
    );
  }
}
