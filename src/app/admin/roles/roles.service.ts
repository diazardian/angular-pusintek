import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http : HttpClient) { }
  
  postRole(data : any){
    return this.http.post<any>("http://localhost:3000/roles",data);
  }

  getRole(){
    return this.http.get<any>("http://localhost:3000/roles");
  }

  updateRole(id : number,data : any){
    return this.http.put<any>("http://localhost:3000/roles/"+id,data);
  }

  deleteRole(id : number){
    return this.http.delete<any>("http://localhost:3000/roles/"+id);
  }
}

