import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // template: `<app-dashb></app-root>`,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ShopApp';
  isLoggedIn: boolean;
  retObj: any;

  

  receiveChildValue(msgEvent) {
    this.retObj = msgEvent;
    console.log("msg: "+msgEvent);
  }
}
