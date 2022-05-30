import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../my-table/model/User.model';
import { TablezService } from '../my-table/services/tablez.service';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private readonly API = 'api/auth';
  //private readonly API = 'http://localhost:8080/api/auth';

  constructor(private httpClient:HttpClient,private tableService:TablezService) { }

  login(user:User){
    return this.httpClient.post<User>(this.API, user).subscribe({
      next: (u:any) => localStorage.setItem('auth',u.type+" "+u.token),
      error: (e:any) => console.log(e),
      complete: () => console.info('login complete')
  });
  }
}
