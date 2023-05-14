import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Todo} from "../interfaces/todo.interface";
const APIURL = "http://localhost:3000/"
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getList(){
    return this.http.get<Todo[]>(APIURL+"todos")
  }
  createTodo(todo:Todo){
    return this.http.post<Todo>(APIURL+"todos",todo)
  }
  deleteTodo(id:number){
    return this.http.delete<Todo>(APIURL+"todos/"+id)
  }
  updateTodo(id:number,todo:Todo){
    return this.http.put<Todo>(APIURL+"todos/"+id,todo)
  }
}
