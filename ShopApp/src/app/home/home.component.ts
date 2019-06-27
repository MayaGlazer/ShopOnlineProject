import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/crud.service';
import { SharingService } from 'src/app/sharing.service';
import { LoginService } from 'src/app/login.service';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cart_items';
import { OrderDetails } from '../models/order_details';
import { Product } from '../models/products';
import { ProductsCategory } from '../models/products_category';
import { ShoppingCart } from '../models/shopping_cart';
import { User } from 'src/app/models/users';
import { Router } from '@angular/router';
// import { } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  hasCart: boolean;
  UserId: number;
  CartId: number;
  CartDate: string;
  totalOrders: any;
  totalProducts: any;
  users: User[] = [];
  carts: ShoppingCart[] = [];
  storage: any;
  // Random number function
  // angularMath.backIntegerOfNumber((angularMath.getRandom() * 999999) + 1) ;

  constructor(private crudservice: CrudService, 
              private loginService: LoginService,
              private sharingService: SharingService,
              private router: Router) { }

  ngOnInit() {
    // this.UserId = this.crudservice.getId();
    this.getCountOrders();
    this.getCountProducts();
    this.crudservice.getId()
    this.storage = JSON.parse(localStorage.getItem('user'))
    //   .subscribe(result => {
    //     console.log('result: '+typeof(result));
    //     this.UserId = result;
    this.findCart();
      // })
    // this.findCart();
  }

  findCart() {
    let userInfo = JSON.parse(localStorage.getItem('user'))
    this.crudservice.getCart(userInfo.id)
    .subscribe(cart => {
      console.log('recieved: '+typeof(cart));
      console.log('recieved1: '+cart);
      console.log('recieved2: '+cart._id);
      console.log('recieved3: '+ cart.active);
      if (cart.active == true) {
      this.CartId = cart._id;
      this.CartDate = cart.date;
      this.hasCart = true;
      this.setShopDetails();
      }
    }, 
    error => this.hasCart = false);

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

// Math.floor((Math.random() * 100000) + 1)

 setShopDetails() {
  let cartObj = this.CartId.toString();
  // var mathrandom: number = Math.floor((Math.random() * 100000) + 1)
  console.log(typeof(cartObj));
  localStorage.setItem("current_cart", cartObj);
  localStorage.setItem("cart_date", this.CartDate);
  this.router.navigate(['/shopping']);//redirects url to new component
 }

 startShopping() {
  let status;
  this.CartId = Math.floor((Math.random() * 100000) + 1);
  this.CartDate = new Date().toLocaleString();
  var newCart = {
    "_id": this.CartId,
    "cust_id": this.storage.id,
    "date": this.CartDate,
    "active": true
} 
  console.log(newCart);
  this.crudservice.newCart(newCart)
    .subscribe((res) => { 
      console.log('res')
      console.log(res)
      localStorage.setItem("current_cart", this.CartId.toString());
      localStorage.setItem("cart_date", this.CartDate);
      this.router.navigate(['/shopping']);//redirects url to new component
    }
    , error => { 
      console.log('error')
      console.log(error)
      localStorage.setItem("current_cart", this.CartId.toString());
      localStorage.setItem("cart_date", this.CartDate);
      this.router.navigate(['/shopping']);//redirects url to new component
      // console.log('error'); 
              }
            //  () => {this.sendToDashboard()}
            )  
 }
  

//  _id: number;
//     cust_id: number;
//     date: string; //new Date().toLocaleString()
//     active: boolean

}
