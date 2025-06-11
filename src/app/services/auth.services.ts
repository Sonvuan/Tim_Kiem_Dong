import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const API_URL = 'http://localhost:8080/auth';
@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(`${API_URL}/login`, data,{ withCredentials: true });
  }

  register(data: any): Observable<any> {
    return this.http.post(`${API_URL}/register`, data,{ withCredentials: true });
  }

 logout(): Observable<any> {
    return this.http.post<any>(`${API_URL}/logout`, {}, { withCredentials: true });
  }

  list(data: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/list`,data, { withCredentials: true });
  }
   delete(id: number): Observable<any> {
      return this.http.post(`${API_URL}/delete`, { id }, { responseType: 'text',withCredentials: true });
    }
  
}
