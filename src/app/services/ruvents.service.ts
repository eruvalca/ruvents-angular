import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ruvent } from '../models/ruvent';

const RuventsUrl = 'https://localhost:44356/api/ruvents';

@Injectable({
  providedIn: 'root'
})
export class RuventsService {

  constructor(private http: HttpClient) { }

  getRuvents(date: string): Observable<Ruvent[]> {
    const url = `${RuventsUrl}/home/${date}`;

    return this.http.get<Ruvent[]>(url).pipe();
  }

  getRuvent(id: number): Observable<Ruvent> {
    const url = `${RuventsUrl}/${id}`;

    return this.http.get<Ruvent>(url).pipe();
    // .pipe(
    //   tap(_ => console.log(`fetched product id=${id}`)),
    //   catchError(this.handleError<Product>(`getProduct id=${id}`))
    // );
  }

  createRuvent(ruvent: Ruvent): Observable<Ruvent> {
    return this.http.post<Ruvent>(RuventsUrl, ruvent).pipe();
    // .pipe(
    //   tap((product: Product) => console.log(`added product w/ id=${product.id}`)),
    //   catchError(this.handleError<Product>('addProduct'))
    // );
  }

  updateRuvent(id: number, ruvent: Ruvent): Observable<any> {
    const url = `${RuventsUrl}/${id}`;

    return this.http.put(url, ruvent).pipe();
    // .pipe(
    //   tap(_ => console.log(`updated product id=${id}`)),
    //   catchError(this.handleError<any>('updateProduct'))
    // );
  }

  deleteRuvent(id: number): Observable<Ruvent> {
    const url = `${RuventsUrl}/${id}`;

    return this.http.delete<Ruvent>(url).pipe();
    // .pipe(
    //   tap(_ => console.log(`deleted product id=${id}`)),
    //   catchError(this.handleError<Product>('deleteProduct'))
    // );
  }
}
