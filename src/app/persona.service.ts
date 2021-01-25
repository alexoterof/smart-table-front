import { Injectable } from '@angular/core';
import {from, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';
import { Persona } from './persona';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
};

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private backUrl = "http://localhost:8080/";

  constructor(
    private http: HttpClient
  ) { }

  getPersonas(): Observable<Persona[]>{
    return this.http.get<Persona[]>(this.backUrl, httpOptions)
      .pipe(
        catchError(this.handleError<Persona[]>('getPersonas', []))
      );
  }

  createOrUpdate(persona: Persona): Observable<Persona>{
    return this.http.put<Persona>(this.backUrl, persona, httpOptions).pipe(
      catchError(this.handleError<any>('createOrUpdatePersona'))
    );
  }

  deleteById(persona: Persona | number): Observable<Persona>{
    const id = typeof persona === 'number' ? persona : persona.id;
    const requestUrl = `${this.backUrl}/${id}`;
    return this.http.delete<Persona>(requestUrl, httpOptions).pipe(
      catchError(this.handleError<any>('deletePersona'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
