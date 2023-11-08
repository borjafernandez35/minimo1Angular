import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Valoration } from './valoration';

import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EventService {

  constructor(
    private messageService: MessageService,
    private http: HttpClient
    ) { }

  
  //The events web API expects a special header in HTTP save requests:
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private valorationsUrl = 'http://localhost:9090/valorations';  // URL to web api


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  /** GET heroes from the server */
  getEvents(): Observable<Valoration[]> {
    return this.http.get<Valoration[]>(this.valorationsUrl)
      .pipe(
        tap(_ => this.log('fetched valorations')),
        catchError(this.handleError<Valoration[]>('getValorations', []))
     );
  }
/*
  getValoration(id: number): Observable<Valoration> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const valoration = VALORATIONS.find(h => h.id === id)!;
    this.messageService.add(`ValorationService: fetched valoration id=${id}`);
    return of(valoration);
  }
  */

  /** GET valoration by id. Will 404 if id not found */
  getValoration(id: string): Observable<Valoration> {
    const url = `${this.valorationsUrl}/${id}`;
    return this.http.get<Valoration>(url).pipe(
      tap(_ => this.log(`fetched valoration id=${id}`)),
      catchError(this.handleError<Valoration>(`getValoration id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateEvent(id: string, valoration: any): Observable<any> { //any canviat
    console.log(id);
    const url = `${this.valorationsUrl}/${id}`;
    
    const resp = this.http.put(url, valoration, this.httpOptions).pipe(
      tap(_ => this.log(`updated valoration id=${id}`)),
      catchError(this.handleError<any>('updateValoration'))
    );
    return resp;

  }

  /** POST: add a new event to the server */
  addValoration(valoration: any): Observable<Valoration> {
    return this.http.post<Valoration>(this.valorationsUrl, valoration, this.httpOptions).pipe(
      tap((newValoration: Valoration) => this.log(`added valoration w/ id=${newEvent._id}`)),
      catchError(this.handleError<Valoration>('addValoration'))
    );
  }

  /** DELETE: delete the event from the server */
  deleteValoration(id: string): Observable<Valoration> {
    const url = `${this.valorationsUrl}/${id}`;

    return this.http.delete<Valoration>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted valoration id=${id}`)),
      catchError(this.handleError<Valoration>('deleteValoration'))
    );
  }

    /* GET events whose name contains search term */
  searchValorations(term: string): Observable<Valoration[]> {
    if (!term.trim()) {
      // if not search term, return empty valoration array.
      return of([]);
   }
    return this.http.get<Valoration[]>(`${this.valorationsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found valorations matching "${term}"`) :
         this.log(`no valorations matching "${term}"`)),
     catchError(this.handleError<Valoration[]>('searchValorations', []))
   );
  }

  /** Log an ValorationService message with the MessageService */
  private log(message: string) {
  this.messageService.add(`ValorationService: ${message}`);
  }
}