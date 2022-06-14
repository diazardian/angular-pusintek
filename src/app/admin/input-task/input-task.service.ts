import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputTaskService {

  constructor(private http : HttpClient) { }

  postTask(data : any){
    return this.http.post<any>("http://localhost:3000/task",data);
  }
}
