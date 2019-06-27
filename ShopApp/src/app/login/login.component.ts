import { Component, OnInit, EventEmitter, Output } from '@angular/core';
// import { DashboardComponent } from '../dashboard/dashboard.component'
import { User } from '../models/users';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/crud.service';
import { SharingService } from 'src/app/sharing.service';
import { LoginService } from 'src/app/login.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms'; 
import { error } from 'util';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
  @Output() obj = new EventEmitter<any>();

  users: User[] = [];
  UserID: number;
  // memberNames = [];
  isLoggedIn: boolean;
  userForm: FormGroup;
  totalOrders: any;
  totalProducts: any;
  UserName: string;
  userRole: string;

  constructor(private crudservice: CrudService, 
              private loginService: LoginService,
              private sharingService: SharingService,
              private formbuilder: FormBuilder,
              private router: Router
              ) { }
  
  ngOnDestroy() {
    // this.crudservice.setId();
  }

  ngOnInit() {
    this.userForm = this.formbuilder.group({
      'email': [null, Validators.required],
      'password': [null, Validators.required]
    })
    this.getCountOrders();
    this.getCountProducts();
    localStorage.clear();
    // localStorage.setItem('isLoggedIn', false)
  }

  getCountOrders() {
     this.crudservice.countOrders()
     .subscribe(sum => {
       this.totalOrders = sum;
       console.log(sum);
     })
  }
  getCountProducts() {
     this.crudservice.countProducts()
     .subscribe(sum => {
       this.totalProducts = sum;
       console.log(sum);
     })
  }

  emitChild() {
    console.log("sent: "+this.isLoggedIn)
    this.obj.emit(this.isLoggedIn);
  }

  onSubmit(LoginForm: NgForm) {
    let status;
    var data = LoginForm.value;
    console.log("data: "+data);
    var loggingUser = {
      "email": data.email,
      "password": data.password,
    }
    console.log(loggingUser);
    this.loginService.loginUser(loggingUser)
      .subscribe((res) => { 
                  this.isLoggedIn = res.success; 
                  this.UserName = res.username; 
                  this.UserID = res.userid;
                  this.userRole = res.userRole;
                  this.crudservice.setId(res.userid); 
                  this.sendToDashboard()
                }
                , error => { 
                  this.isLoggedIn = error.error.success; 
                  console.log(error.error.success); 
                  this.sendToDashboard()
                }
              //  () => {this.sendToDashboard()}
              )  
  }
  
  sendToDashboard() {
    let obj = {status: this.isLoggedIn, name: this.UserName};
    this.sharingService.setDashboard(obj);
    // localStorage.setItem('u')
    if (this.isLoggedIn === true) {
    // let id = ""+this.UserID+""
    let localObj = {id: this.UserID, name: this.UserName};
    localStorage.setItem("user", JSON.stringify(localObj));
    if (this.userRole == 'customer') {
    this.router.navigate(['/home']);//redirects url to new component
    } else {
      this.router.navigate(['/admin']);//redirects url to new component
    }
    } else {
      alert('Wrong Details')
    }
  }

}
