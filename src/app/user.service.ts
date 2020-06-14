import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class UserService {

  private heroesUrl = 'api/hero';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET user from the server */
  getHeroes(): Observable<User[]> {
    return this.http.get<User[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<User[]>('getHeroes', []))
      );
  }

  getHero(id: number): Observable<User> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<User>(`getHero id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */

  /** PUT: update the hero on the server */
  updateHero(hero: User): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated user =${hero.usuario}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *  - name of the operation that failed
   * - optional value to return as the observable result
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

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }
}
