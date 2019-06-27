import { Component, OnInit, Output, Input } from '@angular/core';
import { CrudService } from '../crud.service';
import { User } from '../models/users';
import { LoginService } from '../login.service';
import { SharingService } from '../sharing.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  // @Output() redirect:EventEmitter<any> = new EventEmitter();
  @Input() isLoggedIn: any = false; // data from parent
  users: User[] = [];
  // tasks: Task[] = [];
  retVal: any;
  // isLoggedIn: boolean;
  // Username: string;
  
  constructor(private crudservice: CrudService,
              private loginService: LoginService,
              private sharingService: SharingService,
              private router: Router) { }

  ngOnInit() {
    if (localStorage.length > 0) {
    this.retVal = JSON.parse(localStorage.getItem('user'));
    this.getStatus();
    }
  }

  getStatus() {
    var retVal = this.sharingService.getDashboard();
    // console.log("2: "+(typeof(this.retVal) != 'undefined'));
    if ((typeof(this.retVal) != 'undefined')) {
      this.isLoggedIn = true;
      // this.Username = retVal.name;
      console.log('if');
    } else {
      this.isLoggedIn = false;
      // this.Username = 'undefined';
      console.log('else');
    }
    // console.log('retval: '+this.retVal);
  }

  receiveChildValue(msgEvent) {
    this.isLoggedIn = msgEvent;
    console.log("msg: "+msgEvent);
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['']);//redirects url to new component
  }

}
