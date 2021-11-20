import { Injectable } from '@angular/core';
import { forkJoin, from, merge, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, mergeAll } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {
  }

  ofExample(): Observable<string[]> {
    // The 'of' function emits all elements once
    return of(['blue', 'green', 'red']);
  }

  fromExample(): Observable<string> {
    // The 'from' function emits the elements one by one
    return from(['blue', 'green', 'red']);
  }

  forkJoinExample(): Observable<any> {
    // Joins the last value emitted by each request
    return forkJoin({
      pokemon: this.http.get(`${environment.pokemonAPI}/pokemon/eevee`),
      ability: this.http.get(`${environment.pokemonAPI}/ability/50`)
    });
  }
}
