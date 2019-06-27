import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, of } from 'rxjs';
import { CartItem } from './models/cart_items';
import { OrderDetails } from './models/order_details';
import { Product } from './models/products';
import { ProductsCategory } from './models/products_category';
import { ShoppingCart } from './models/shopping_cart';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private productsURL = 'http://localhost:3010/api/products';
  private pCategoryURL = 'http://localhost:3010/api/productscategory';
  private shopCartURL = 'http://localhost:3010/api/shoppingcart';
  private cartItemsURL = 'http://localhost:3010/api/cartitems';
  private orderDetailsURL = 'http://localhost:3010/api/orderdetails';

  constructor(private http: HttpClient) { }

  userID: number;
  cartID: number;

  
  
  //PRODUCTS
  getAllproducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsURL);
  }
  
  searchProduct (str: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productsURL}/search/${str}`);
  }

newProduct (product: Product): Observable<Product> {
  return this.http.post<Product>(this.productsURL, product);
}

countProducts(): Observable<any> {
  return this.http.get<any>(`${this.productsURL}/count`);
}

getProduct (id: number): Observable<Product> {
  return this.http.get<Product>(`${this.productsURL}/${id}`);
}

updateProduct (id: number , product: any): Observable<any> {
  return this.http.put<any>(`${this.productsURL}/${id}`, product);
}

getProductbyCatid (id: number): Observable<Product[]> {
  return this.http.get<Product[]>(`${this.productsURL}/category/${id}`);
}

//PRODUCTS CATEGORY
getAllCategories(): Observable<ProductsCategory[]> {
  return this.http.get<ProductsCategory[]>(this.pCategoryURL);
}

//SHOPPING CART
newCart (cart: ShoppingCart): Observable<ShoppingCart> {
  return this.http.post<ShoppingCart>(this.shopCartURL, cart);
}

getCart (id: number): Observable<ShoppingCart> {
  return this.http.get<ShoppingCart>(`${this.shopCartURL}/${id}`);
}

updateCart (id: number , active: any): Observable<ShoppingCart> {
  return this.http.put<ShoppingCart>(`${this.shopCartURL}/${id}`, active);
}

//CART ITEMS

getAllcarts(): Observable<ShoppingCart[]> {
  return this.http.get<ShoppingCart[]>(`${this.shopCartURL}/all`);
}

searchItem (str: string): Observable<CartItem[]> {
  return this.http.get<CartItem[]>(`${this.cartItemsURL}/search/${str}`);
}

addToCart (item: CartItem): Observable<CartItem> {
  return this.http.post<CartItem>(this.cartItemsURL, item);
}

getItemsbyCartid (id: number): Observable<CartItem[]> {
  return this.http.get<CartItem[]>(`${this.cartItemsURL}/mycart/${id}`);
}

updateCartItem (id: number, item: CartItem): Observable<CartItem> {
  return this.http.put<CartItem>(`${this.cartItemsURL}/${id}`, item);
}

getTotalPrice (id: number): Observable<any> {
  return this.http.get<any>(`${this.cartItemsURL}/sum/${id}`);
}
deleteItem (id: number): Observable<CartItem> {
  return this.http.get<CartItem>(`${this.cartItemsURL}/delete/${id}`);
}

deleteAllItems (id: number): Observable<CartItem> {
  return this.http.get<CartItem>(`${this.cartItemsURL}/delete/all/${id}`);
}

// ORDER DETAILS

finishOrder (order: OrderDetails): Observable<OrderDetails> {
  return this.http.post<OrderDetails>(this.orderDetailsURL, order);
}

countOrders(): Observable<any> {
  return this.http.get<any>(`${this.orderDetailsURL}/count`);
}

getAllDates(): Observable<any> {
  return this.http.get<any[]>(`${this.orderDetailsURL}/datearray`);
}

setId(id: number) {
  this.userID = id;
}

// getId(): Observable<any> {
//   return of(this.userID);
// }

getId() {
   return JSON.parse(localStorage.getItem('user')).id;
}

setCartId(id: number) {
  this.cartID = id; 
}

getCartId() {
  return this.cartID;
}


}
