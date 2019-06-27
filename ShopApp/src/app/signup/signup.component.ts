import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms'; 
import { CrudService } from 'src/app/crud.service';
import { LoginService } from 'src/app/login.service';
import { SharingService } from 'src/app/sharing.service';
import { Router } from '@angular/router';
import { parse } from 'url';
import { User } from 'src/app/models/users';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  showStep2: boolean = false;
  submitted = false;
  signupForm: FormGroup;
  idValid: boolean;
  emailValid: boolean;
  pwValid: boolean;
  cpwValid: boolean;
  errorMsg: string;
  users: User[] = [];
  
  constructor(private crudservice: CrudService, 
    private loginService: LoginService,
    private sharingService: SharingService,
    private formbuilder: FormBuilder,
    private router: Router
    ) { }

  ngOnInit() {
    this.signupForm = this.formbuilder.group({
      'firstname': [null, Validators.required],
      'lastname': [null, Validators.required],
      'password': [null, Validators.required],
      'confirmpassword': [null, Validators.required],
    })
    this.getUsers();
  }
  
  async nextStep(SignUpForm: NgForm) {
    let data = SignUpForm.value;
    await this.idValidate(data.id);
    if (this.emailValidate(data.email) == true) {
      this.emailValid = true;
    } else {
      this.errorMsg = "Email is invalid.";
    }
    await this.pwValidate(data.password, data.confirmpassword);
    // console.log("1: "+this.idValid);
    // console.log("2: "+this.emailValid);
    // console.log("3: "+this.pwValid);
    // console.log("4: "+this.cpwValid);
    if (this.cpwValid == true && this.emailValid == true && this.idValid == true && this.pwValid == true) {
      return this.showStep2 = true;
    }
  }

  getUsers() {
    return  this.loginService.getAllusers()
      .subscribe(
        users => {
          console.log(users);
          this.users = users;
        }
      );
  }

  onSubmit(SignUpForm: NgForm) {
    let status;
    var data = SignUpForm.value;
    console.log("data: "+data);
    var signupUser = {
      "_id": data.id,
      "firstname": data.firstname,
      "lastname": data.lastname,
      "email": data.email,
      "password": data.password,
      "role": 'customer'
  } 
    console.log(signupUser);
    this.loginService.newUser(signupUser)
      .subscribe((res) => { 
        console.log('res')
        // let obj = {status: this.isLoggedIn, name: this.UserName};
        let localObj = {id: data.id, name: data.firstname};
        localStorage.setItem("user", JSON.stringify(localObj));
        console.log(res)
        this.router.navigate(['/home']);//redirects url to new component
      }
      , error => { 
        console.log('error');
        let localObj = {id: data.id, name: data.firstname};
        localStorage.setItem("user", JSON.stringify(localObj));
        // alert('Sign in went successfully!')
        this.router.navigate(['/home']);//redirects url to new component
        // console.log('error'); 
                  console.log(error); 
                }
              //  () => {this.sendToDashboard()}
              )  
}

emailValidate(email) {
  let pattern =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var matcher = new RegExp(pattern, 'gi');
  return matcher.test(email);
}

idValidate(dataid) {
  var id = parseInt(dataid);
  var counter;
    if (!isNaN(id)) {
    this.users.forEach(value => {
      if (value._id == id) {
        this.idValid = false;
        return this.errorMsg = "Id already exists.";
      } else {
        this.idValid = true;
      }
    })
    } else {
      this.errorMsg = "Id is invalid."
    }
}

pwValidate(password, confirmpassword) {
  if (password == confirmpassword) {
    this.cpwValid = true;
    this.pwValid = true;
  }
}

}
