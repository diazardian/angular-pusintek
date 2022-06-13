import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DivisiService {

  constructor(private http : HttpClient) { }

  postRole(data : any){
    return this.http.post<any>("http://localhost:3000/divisi",data);
  }
  getRole(){
    return this.http.get<any>("http://localhost:3000/divisi");
  }
}
