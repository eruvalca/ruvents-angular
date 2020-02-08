import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ruvent } from '../models/ruvent';
import { RuventToUser } from '../models/ruventToUser';

// const RuventsUrl = 'https://ruvents-api20191022110832.azurewebsites.net/api/ruvents';
const RuventsUrl = 'https://localhost:44356/api/ruvents';

@Injectable({
  providedIn: 'root'
})
export class RuventsService {

  constructor(private http: HttpClient) { }

  getRuvents(month: number, year: number): Observable<Ruvent[]> {
    const url = `${RuventsUrl}/${month}/${year}`;

    return this.http.get<Ruvent[]>(url).pipe();
  }

  getRuvent(id: number): Observable<Ruvent> {
    const url = `${RuventsUrl}/${id}`;

    return this.http.get<Ruvent>(url).pipe();
  }

  createRuvent(ruvent: Ruvent): Observable<Ruvent> {
    return this.http.post<Ruvent>(RuventsUrl, ruvent).pipe();
  }

  updateRuvent(id: number, ruvent: Ruvent): Observable<any> {
    const url = `${RuventsUrl}/${id}`;

    return this.http.post(url, ruvent).pipe();
  }

  deleteRuvent(id: number): Observable<Ruvent> {
    const url = `${RuventsUrl}/${id}`;

    return this.http.delete<Ruvent>(url).pipe();
  }
}
