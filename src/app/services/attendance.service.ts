import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ruvent } from '../models/ruvent';
import { RuventToUser } from '../models/ruventToUser';

// const AttendanceUrl = 'https://ruvents-api20191022110832.azurewebsites.net/api/attendance';
const AttendanceUrl = 'https://localhost:44356/api/attendance';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient) { }

  getRuventAttendance(id: number): Observable<RuventToUser[]> {
    const url = `${AttendanceUrl}/${id}`;

    return this.http.get<RuventToUser[]>(url).pipe();
  }

  createAttendance(attendance: RuventToUser): Observable<any> {
    const url = `${AttendanceUrl}`;

    return this.http.post<any>(url, attendance).pipe();
  }

  updateAttendance(id: number, attendance: RuventToUser): Observable<any> {
    const url = `${AttendanceUrl}/${id}`;

    return this.http.post<any>(url, attendance).pipe();
  }

  deleteAttendance(id: number): Observable<RuventToUser> {
    const url = `${AttendanceUrl}/${id}`;

    return this.http.delete<RuventToUser>(url).pipe();
  }
}
