import { Inject, Injectable } from '@angular/core';
import {Pessoa} from '../model/Pessoa.model';
import {Responsez} from '../model/Responsez.model';
import { HttpClient } from '@angular/common/http';
import { MatSort, Sort } from '@angular/material/sort';
import { delay, first, map, tap } from 'rxjs';

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
}
