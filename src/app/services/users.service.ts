import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import axios from 'axios';



@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = 'http://localhost:5206'
  private apiUrl = 'http://localhost:5206/api/Users';
  private http = inject(HttpClient);
  private axios_instance = axios.create()
  
  

  async listUser(): Promise<User[]> {
    console.log("Сработал вызов функции в Users service")
    console.log(this.http.get<User[]>(this.apiUrl))
    const response = await axios.get<User[]>(this.apiUrl)
    return response.data;
  }

  listUserHttp(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`)
  }
  listUsersWithCollege(): Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/college`)
  }
  deleteUser(user: User){
    return this.http.delete(`${this.apiUrl}`, {
      params: new HttpParams().set(`id`, user.id)
    })
  }
  createUser(user: User) {
    return this.http.post<User>(`${this.apiUrl}`, user)


  }
  getUserById(id:string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`)
  }
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.apiUrl, user);
  }
  constructor() { }
}
