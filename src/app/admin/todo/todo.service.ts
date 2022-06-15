import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http : HttpClient) { }

  getTodos(id : any) {
    return this.http.get('http://localhost:3000/user/' + id + '?_embed=task');
  }
  getTodosAll() {
    return this.http.get('http://localhost:3000/user/?_embed=task');
  }
  getAllTask() {
    return this.http.get('http://localhost:3000/task/');
  }
  getUser(id : any) {
    return this.http.get('http://localhost:3000/user/' + id);
  }
  editTodo(id : any, data : any) {
    return this.http.put('http://localhost:3000/task/' + id, data);
  }
  deleteTodo(id : any) {
    return this.http.delete('http://localhost:3000/task/' + id);
  }
}
