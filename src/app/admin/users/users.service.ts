import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http : HttpClient) { }

  postUser(data : any){
    return this.http.post<any>("http://localhost:3000/user",data);
  }
  getUser(){
    return this.http.get<any>("http://localhost:3000/user?_expand=roles&_expand=divisi");
  }
  getDivisi(){
    return this.http.get<any>("http://localhost:3000/divisi");
  }
  getRoles(){
    return this.http.get<any>("http://localhost:3000/roles");
  }
  updateUser(id : any,data : any){
    return this.http.put<any>("http://localhost:3000/user/"+id,data);
  }
  deleteUser(id : any){
    return this.http.delete<any>("http://localhost:3000/user/"+id);
  }
}
