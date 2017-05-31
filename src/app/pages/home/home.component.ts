import { Component, OnInit } from '@angular/core';
import { slideInOutAnimation } from '../../animations/slideTransition';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' }
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
