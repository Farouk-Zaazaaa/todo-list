import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient , private _Router:Router) { }


  signup(data:any):Observable<any>{
    return this._HttpClient.post("https://note-sigma-black.vercel.app/api/v1/users/signUp" , data)
  }

  login(data:any):Observable<any>{
    return this._HttpClient.post("https://note-sigma-black.vercel.app/api/v1/users/signin", data)
  }

  logout(){
    localStorage.removeItem("toke")
    this._Router.navigate(['/login'])
  } 
}
