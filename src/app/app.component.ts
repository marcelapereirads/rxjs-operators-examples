import { Component } from '@angular/core';
import { concat, forkJoin, from, interval, of } from 'rxjs';
import { concatMap, count, every, exhaustMap, filter, map, mergeMap, switchMap, take, tap, toArray, mergeAll } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  parentObservable$ = interval(1000).pipe(map(i => `Parent ${i}`));
  childObservable$ = (parent) => interval(2000).pipe(map(i => `Child of ${parent} => ${(i) * 10}`));
a
  initExample(functionName: string) {
    console.log(`====================== ${functionName.toUpperCase()} ======================`);
  }

  ofExample() {
    this.initExample('of');

    // The 'of' function emits all elements once
    of(['blue', 'green', 'red']).subscribe(item => console.log(item));
  }

  fromExample() {
    this.initExample('from');

    // The 'from' function emits the elements one by one
    from(['blue', 'green', 'red']).subscribe(item => console.log(item));
  }

  mapExample() {
     this.initExample('map');

    const numbers = from([1, 2, 3]).pipe(
      // The 'map' transforms the emitted value
      map(number => 'The number is ' + number)
    );
    numbers.subscribe(value => console.log(value));
  }

  filterExample() {
    this.initExample('filter');

    const numbers = from([1, 2, 3]).pipe(
      // The 'filter' allows to use a condition to filter the values
      filter(number => number % 2 === 0)
    );

    numbers.subscribe(value => console.log(value));
  }

  everyExample() {
    this.initExample('every');

    const numbers = from([1, 2, 3]).pipe(
      // The 'every' checks a condition for all items of the source
      every(number => number % 2 === 0),
    );

    numbers.subscribe(value => console.log(value));
  }

  countExample() {
    this.initExample('count');

    from([1, 2, 3]).pipe(
      // The 'count' emits the number of emissions when the source completes
      count()
    ).subscribe(value => console.log(value));
  }

  toArrayExample() {    
    this.initExample('to array');

    this.parentObservable$.pipe(
      take(4),
      // The 'toArray' emits an array with all values when the source completes
      toArray()
    ).subscribe(value => console.log(value));
  }

  concatExample() {
    this.initExample('concat');

    // The 'concat' creates an observable that emits values from all sources
    const concatedValues = concat(of(1), of(2));

    concatedValues.subscribe(value => console.log(value));
  }

  forkJoinExample() {
    this.initExample('fork join');
    
    // The 'forkJoin' emits an array or object with all the passed values
    forkJoin({
      firstObservable: of(1),
      secondObsevable: of(2)
    }).subscribe(value => console.log(value));
  }

  concatMapExample() {
    this.initExample('concat map');

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
    this.initExample('merge map');

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
    this.initExample('switch map');

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
    this.initExample('exhaust map');

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
