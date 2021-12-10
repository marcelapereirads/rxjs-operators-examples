import { Component } from '@angular/core';
import { concat, forkJoin, from, interval, of } from 'rxjs';
import { concatMap, exhaustMap, map, mergeMap, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  parentObservable$ = interval(1000).pipe(map(i => `Parent ${i}`));
  childObservable$ = (parent) => interval(2000).pipe(map(i => `Child of ${parent} => ${(i) * 10}`));

  ofExample() {
    console.log('====================== OF ======================');

    // The 'of' function emits all elements once
    of(['blue', 'green', 'red']).subscribe(item => console.log(item));
  }

  fromExample() {
    console.log('====================== FROM ======================');

    // The 'from' function emits the elements one by one
    from(['blue', 'green', 'red']).subscribe(item => console.log(item));
  }

  mapExample() {
    console.log('====================== MAP ======================');

    const numbers = from([1, 2, 3]).pipe(
      // The 'map' transforms the emitted value
      map(number => 'The number is ' + number)
    );
    numbers.subscribe(value => console.log(value));
  }

  concatExample() {
    console.log('====================== CONCAT ======================');

    // The 'concat' creates an observable that emits values from all sources
    const concatedValues = concat(of(1), of(2));

    concatedValues.subscribe(value => console.log(value));
  }

  forkJoinExample() {
    console.log('====================== FORK JOIN ======================');
    
    // The 'forkJoin' emits an array or object with all the passed values
    forkJoin({
      firstObservable: of(1),
      secondObsevable: of(2)
    }).subscribe(value => console.log(value));
  }

  concatMapExample() {
    console.log('====================== CONCAT MAP ======================');

    this.parentObservable$.pipe(
      tap(console.log),
      take(5),
      // The 'concatMap' waits for the end of the previous observable to complete before creaating the second
      concatMap((value) => this.childObservable$(value).pipe(
        tap(console.log),
        take(3)
      ))
    ).subscribe();
  }

  mergeMapExample() {
    console.log('====================== MERGE MAP ======================');

    this.parentObservable$.pipe(
      tap(console.log),
      take(5),
      // The 'mergeMap' combines the values of two observables (does not guarantee that they are executed in sequence)
      mergeMap((value) => this.childObservable$(value).pipe(
        tap(console.log),
        take(3)
      ))
    ).subscribe();
  }

  switchMapExample() {
    console.log('====================== SWITCH MAP ======================');

    this.parentObservable$.pipe(
      tap(console.log),
      take(5),
      // The 'switchMap' breaks the current observable and creates the next one
      switchMap((value) => this.childObservable$(value).pipe(
        tap(console.log),
        take(3)
      ))
    ).subscribe();
  }

  exhaustMapExample() {
    console.log('====================== EXHAUST MAP ======================');
    
    this.parentObservable$.pipe(
      tap(console.log),
      take(5),
      // The 'exhaustMap' ignores other observables while the previous one is not complete
      exhaustMap((value) => this.childObservable$(value).pipe(
        tap(console.log),
        take(3)
      ))
    ).subscribe();
  }
}
