import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(private service: AppService) { }

  ngOnInit() {
    this.service.ofExample().subscribe(values => console.log('Of:', values));
    this.service.fromExample().subscribe(values => console.log('From:', values));
    this.service.forkJoinExample().subscribe(values => console.log('Fork Join:', values));
  }
}
