import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/Currency';

@Injectable({ providedIn: 'root' })
export class ParaCurrencyRateService {

  constructor(private http: HttpClient) {}

  list(searchInput: any): Observable<any> {
    return this.http.post(`${API_URL}/list`, searchInput);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${API_URL}/Create`, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.post(`${API_URL}/Update?id=${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.post(`${API_URL}/delete?id=${id}`, null,{responseType: 'text'});
  }

  findBySpec(searchInput: any): Observable<any> {
    return this.http.post(`${API_URL}/findBySpec`, searchInput);
  }

  findByNav(searchInput: any): Observable<any> {
    return this.http.post(`${API_URL}/findByNav`, searchInput);
  }

  findByPro(searchInput: any): Observable<any> {
    return this.http.post(`${API_URL}/findByPro`, searchInput);
  }
}
