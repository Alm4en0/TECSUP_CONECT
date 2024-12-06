import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarrerasService {
  private apiUrl = 'http://localhost:3000/api/carreras';

  constructor(private http: HttpClient) {}

  getCarreras(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
