import { Component, OnInit } from '@angular/core';
import { User } from '../models/users';
import { ProductsCategory } from '../models/products_category';
import { Product } from '../models/products';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/crud.service';
import { SharingService } from 'src/app/sharing.service';
import { LoginService } from 'src/app/login.service';
import { error } from 'util';
import { CartItem } from 'src/app/models/cart_items';
import { FormsModule } from '@angular/forms';
// import {} from '../../assets';

declare var $: any;

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})

export class ShoppingComponent implements OnInit {

  
  productsCategory: ProductsCategory[];
  selectedProducts: Product[] = [];
  searchedProducts: Product[] = [];
  selectedCat: ProductsCategory;
  cartId: number;
  cartItems: CartItem[];
  delItem: boolean = false;
  Total: number = 0;
  NoSearch: boolean = true;
  searchStr: string = '';

  constructor(private crudservice: CrudService, 
    private loginService: LoginService,
    private sharingService: SharingService,
    private router: Router
    ) { }

  ngOnInit() {
    // console.log('arrived Shopping')
    this.getAllcats();
    this.cartId = parseInt(localStorage.getItem("current_cart"));
    this.getCartList();
  //   $('body').on('mouseover', '.list-group-item', function (e) {
  //     var that = $(this)
  //     $(this).children('span').addClass('disblock');
  //     $(this).children('span').css('display', 'block');
  //     console.log('that');
  //     console.log(that);
  //     console.log('span');
  //     // console.log(span);
  // })

  }


  getAllcats() {
    return this.crudservice.getAllCategories()
    .subscribe(
      categories => {
        console.log(categories);
        this.productsCategory = categories;
      }
    );
  }

  getProducts(id) {
    return this.crudservice.getProductbyCatid(id)
    .subscribe(
      products => {
        console.log(products);
        this.selectedProducts = products;
      }
    );
  }

  removeItem(id) {
    return this.crudservice.deleteItem(id)
    .subscribe(
      item => {
        console.log('item');
        console.log(item);
        this.getCartList();
        // this.selectedProducts = products;
      }
    );
  }

    searchP(str: string) {
      if (str == '') {
        this.NoSearch = true;
        this.searchedProducts = []
      } else {
      return this.crudservice.searchProduct(str)
    .subscribe(
      products => {
        // console.log(products);
        // products.forEach((product) => {

        // })
        this.searchStr = str;
        this.searchedProducts = products;
        this.NoSearch = false;
      }, error => {
        console.log(error);
      }
    );
  }
    }

    addToCart(selProduct, quantityId) {
      console.log(quantityId);
      console.log(selProduct);
      var qtySum = (document.getElementById(quantityId) as HTMLInputElement).value;
      console.log(qtySum);
      let overallPrice = parseInt(qtySum) * selProduct.price;
    var newCartItem = {
      "_id": Math.floor((Math.random() * 100000) + 1),
      "name": selProduct.name,
      "prod_id": selProduct.id,
      "quantity": parseInt(qtySum),
      "overall_price": parseFloat(overallPrice.toFixed(2)),
      "cart_id": this.cartId,
      "image": selProduct.image
    }
    // console.log(loggingUser);
    this.crudservice.addToCart(newCartItem)
      .subscribe((res) => { 
                  console.log('res');
                  console.log(res);
                  this.getCartList()
                  // this.sendToDashboard()
                }
                , error => { 
                  console.log('error');
                  console.log(error);
                  this.getCartList()
                }
              //  () => {this.sendToDashboard()}
              )  
    }

    getCartList() {
      return this.crudservice.getItemsbyCartid(this.cartId)
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
        }
      );
    }

    onSelect(category: ProductsCategory): void {
      this.selectedCat = category;
      console.log('selected');
    }

    goToOrder() {
      this.router.navigate(['/order']);//redirects url to new component
    }


}
