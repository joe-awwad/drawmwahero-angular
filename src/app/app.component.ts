import { Component, OnInit } from '@angular/core';

import * as declarativeToggle from 'src/ts/declarativeToggle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Draw Me A Hero';

  ngOnInit(): void {
    declarativeToggle.initDeclarativeToggle();
  }

}
