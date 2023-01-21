import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IUser, User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl= environment.api;

  constructor( private http:HttpClient) { }
  getApi(){
    return this.apiUrl;
  }
  
  auth(data:User){
    let url =  `${this.getApi()}/usuario/iniciar_login2`;
    return this.http.post<IUser>(url, data);
  }
}
