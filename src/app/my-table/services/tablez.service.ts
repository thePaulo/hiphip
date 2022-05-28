import { Inject, Injectable } from '@angular/core';
import {Pessoa} from '../model/Pessoa.model';
import {Responsez} from '../model/Responsez.model';
import { HttpClient } from '@angular/common/http';
import { MatSort, Sort } from '@angular/material/sort';
import { delay, first, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TablezService {

  private readonly API = 'api/pessoa';//'localhost:8080/pessoa';
  //private readonly API ='localhost:8080/api/pessoa';
  constructor(@Inject(HttpClient) private httpClient:HttpClient) {

  }
  list(page:number,sorting:Sort) {
    var paginate : string = "";
    paginate = "?page="+page;
    var sort : string = "&sort="+sorting.active+","+sorting.direction;
    
    return this.httpClient.get<String>(this.API+paginate+sort)
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
    return this.httpClient.delete(this.API+"/"+id.toString());
  }
  create(p:Pessoa){
    return this.httpClient.post<Pessoa>(this.API, p);
  }
  update(id:number, p:Pessoa): Observable<Pessoa> {
    console.log(JSON.stringify(p));
    return this.httpClient.put<Pessoa>(this.API + '/' + id,p)
  }
  getOne(id:String){
    return this.httpClient.get<String>(this.API+'/'+id)
    .pipe(
      first(),
    );
  }
}
