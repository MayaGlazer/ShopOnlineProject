import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms'; 
import { CrudService } from 'src/app/crud.service';
import { LoginService } from 'src/app/login.service';
import { SharingService } from 'src/app/sharing.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/users';
import { CartItem } from 'src/app/models/cart_items';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  cartItems: CartItem[] = []
  searchedItems: CartItem[] = []
  searchOn: boolean = false;
  cartID: number;
  cartDate: string;
  storage: any;
  Total: number = 0;
  searchStr: string;
  submitted: boolean = false;

  constructor(private crudservice: CrudService, 
    private loginService: LoginService,
    private sharingService: SharingService,
    private formbuilder: FormBuilder,
    private router: Router
    ) { }

  ngOnInit() {
    this.storage = JSON.parse(localStorage.getItem('user'));
    this.cartDate = localStorage.getItem("cart_date");
    this.cartID = parseInt(localStorage.getItem("current_cart"));
    this.getCartList();
  }

  getCartList() {
    return this.crudservice.getItemsbyCartid(this.cartID)
  .subscribe(
    items => {
      console.log(items);
      this.Total = 0;
      let that = this;
      items.forEach(function(i) {
        that.Total = that.Total + i.overall_price
        that.Total = parseFloat(that.Total.toFixed(2));
        console.log(that.Total);
      })
      this.cartItems = items;
      },
      error  => {
        console.log(error);
      }
    );
  }

  finishOrder(orderForm: NgForm) {
    let data = orderForm.value;
    // var qtySum = (document.getElementById(quantityId) as HTMLInputElement).value;
    let creditcard = "" + data.creditcard + "";  
    let lastFour = creditcard.substr(-4);  
    console.log(lastFour);
  var newOrder = {
    "_id": Math.floor((Math.random() * 1000000) + 1),
    "cart_id": this.cartID,
    "finalprice": this.Total,
    "cust_id": parseInt(this.storage.id),
    "shipping_city": data.city,
    "shipping_street": data.street,
    "shipping_date": data.shippingdate,
    "cart_date": this.cartDate,
    "credit_4digits": parseInt(lastFour)
  }
  // console.log(loggingUser);
  this.crudservice.finishOrder(newOrder)
    .subscribe((res) => { 
                console.log('res');
                console.log(res);
                this.submitted = true;
                let active = false;
                this.deactivateCart(active);
                // this.sendToDashboard()
              }
              , error => { 
                console.log('error');
                console.log(error);
              }
            //  () => {this.sendToDashboard()}
            )  
  }

  // ORIGINAL
  searchItems(str: string) {
    if (str == '') {
      this.searchOn = false;
      this.searchedItems = []
    } else {
    return this.crudservice.searchItem(str)
  .subscribe(
    items => {
      console.log(items);
      // products.forEach((product) => {

      // })
      this.searchStr = str;
      this.searchedItems = items;
      this.searchOn = true;
    }
  );
}
}

  deactivateCart(active) {
    var curactive = {
      "active": active,
  } 
    console.log('curactive');
    console.log(curactive);
    this.crudservice.updateCart(this.cartID, curactive)
      .subscribe((res) => { 
        console.log('resofdeactivate')
        console.log(res)
        localStorage.removeItem("cart_date");
        localStorage.removeItem("current_cart");
      }
      , error => { 
        // alert('Sign in went successfully!')
        console.log('error'); 
        console.log(error); 
                }
              //  () => {this.sendToDashboard()}
              )  
  }

  backtohome() {
    this.router.navigate(['/home']);//redirects url to new component
  }

}
