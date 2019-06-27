import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { CartItem } from './models/cart_items';
import { OrderDetails } from './models/order_details';
import { Product } from './models/products';
import { ProductsCategory } from './models/products_category';
import { ShoppingCart } from './models/shopping_cart';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SharingService {

  private dashData:any = {};
  private currentuser: any;
  private data: any;

  constructor(private http: HttpClient) { }

setUser(data:any){
    this.currentuser = data;
}

getUser():any{
    return this.currentuser;
}
  setDashboard(data:any){
    this.dashData = data;
}

getDashboard():any{
    return this.dashData;
}

setData(data:any){
    this.data = data;
}

getData():any{
    return this.data;
}

}
