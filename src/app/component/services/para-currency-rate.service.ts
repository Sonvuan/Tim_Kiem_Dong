import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/Currency';
const API_URL1 = 'http://localhost:8080/Country';

@Injectable({ providedIn: 'root' })
export class ParaCurrencyRateService {

  constructor(private http: HttpClient) {}

  getAll(data: any):Observable<any>{
    return this.http.post(`${API_URL1}/getAll`, data);
    
  }

  list(searchInput: any): Observable<any> {
    return this.http.post(`${API_URL}/list`, searchInput);
  }



  create(data: any): Observable<any> {
    return this.http.post(`${API_URL}/Create`, data);
  }

  // update(id: number, data: any): Observable<any> {
  //   return this.http.post(`${API_URL}/Update?id=${id}`, data);
  // }
  update(data: any): Observable<any> {
  return this.http.post(`${API_URL}/Update`, data);
}


  // delete(id: number): Observable<any> {
  //   return this.http.post(`${API_URL}/delete?id=${id}`, null,{responseType: 'text'});
  // }


 delete(id: number): Observable<any> {
  return this.http.post(`${API_URL}/delete`, { id }, { responseType: 'text' });
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
