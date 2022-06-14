import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DivisiService {

  constructor(private http : HttpClient) { }

  postDivisi(data : any){
    return this.http.post<any>("http://localhost:3000/divisi",data);
  }

  getDivisi(){
    return this.http.get<any>("http://localhost:3000/divisi");
  }

  updateDivisi(id : number,data : any){
    return this.http.put<any>("http://localhost:3000/divisi/"+id,data);
  }

  deleteDivisi(id : number){
    return this.http.delete<any>("http://localhost:3000/divisi/"+id);
  }
}
