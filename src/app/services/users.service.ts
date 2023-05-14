import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces/user.interface";
const APIURL = "http://localhost:3000/"
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  getAllUsers(){
    return this.http.get<User[]>(APIURL+"users")
  }
  getUserById(id:number){
    return this.http.get<User>(APIURL+"users/"+id)
  }
}
