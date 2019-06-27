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
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
// import {} from '../../assets';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  productsCategory: ProductsCategory[];
  allProducts: Product[] = [];
  selectedProducts: Product[] = [];
  searchedProducts: Product[] = [];
  selectedCat: ProductsCategory;
  cartId: number;
  cartItems: CartItem[];
  delItem: boolean = false;
  Total: number = 0;
  NoSearch: boolean = true;
  searchStr: string = '';
  prodjson: Product;
  chosen: boolean = false;
  productId: number;
  selectedCatName: any;
  existingProduct: boolean = false;
  newProductF: boolean = false;
  finalCatId: any;
  imgSrc: string;
  currentProductId: any;

  constructor(private crudservice: CrudService,
    private loginService: LoginService,
    private sharingService: SharingService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllcats();
    this.getAllproducts();
    this.cartId = parseInt(localStorage.getItem("current_cart"));
  }


  Update(productForm: NgForm, newJson) {
    // this.getAllproducts();
    console.log('productvalue')
    console.log(productForm.value)
    let data = productForm.value
    this.getProductId(data.pName);
    var cat_id = this.getCatId(data.pcName)
    // console.log(this.finalCatId);
    var curactive = {
      "name": data.pName,
      "cat_id": this.finalCatId,
      "price": data.pPrice,
    }
    console.log('curactive');
    console.log(curactive);
    console.log('this.currentProductId');
    console.log(this.currentProductId);
    this.crudservice.updateProduct(this.currentProductId, curactive)
      .subscribe((res) => {
        console.log('resofdeactivate')
        console.log(res)
        this.existingProduct = false;
        this.getAllproducts();
      }
      , error => {
        console.log('error');
        console.log(error);
        this.existingProduct = false;
        this.getAllproducts();
      }
      //  () => {this.sendToDashboard()}
      )
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

  getProduct(id) {
    return this.crudservice.getProduct(id)
      .subscribe(
      product => {
        console.log(product);
        this.chosen = true;
        this.existingProduct = true;
        this.newProductF = false;
        this.getCatName(product.cat_id)
        this.prodjson = product;
      }
      );
  }

  getProducts(id) {
    return this.crudservice.getProductbyCatid(id)
      .subscribe(
      products => {
        this.productId = id;
        console.log(products);
        this.selectedProducts = products;
        this.getAllproducts();
      }
      );
  }

  addingFields() {
    this.chosen = true;
    this.existingProduct = false;
    this.newProductF = true;
    console.log("addingFields")
    console.log(this.newProductF)
  }

  onSelect(category: ProductsCategory): void {
    this.selectedCat = category;
    console.log('selected');
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
          this.getAllproducts();
        }, error => {
          console.log(error);
          this.getAllproducts();
        }
        );
    }
  }

  submitProduct(productForm: NgForm) {
    let status;
    var data = productForm.value;
    console.log("data: ");
    console.log(data);
    var cat_id = this.getCatId(data.catname);
    var newProduct = {
      "_id": Math.floor((Math.random() * 100000) + 1),
      "name": data.name,
      "cat_id": this.finalCatId,
      "price": data.price,
      "image": this.imgSrc
  } 
    console.log(newProduct);
    this.crudservice.newProduct(newProduct)
      .subscribe((res) => { 
        console.log('res')
        console.log(res)
        this.newProductF = false;
        // alert('Product Added Successfuly!');
      }
      , error => { 
        // alert('Sign in went successfully!')
        this.newProductF = false;
        // console.log('error'); 
                  console.log(error); 
                }
              //  () => {this.sendToDashboard()}
              ) 
  }

  getCatName(id) { 
    let that = this;
    let catId = id;
    // this.getMembers();
    let allCats = this.productsCategory;
    allCats.forEach((e1) => {
    if(e1._id == catId) {
    that.selectedCatName = e1.name;
    console.log("name: "+that.selectedCatName)
      }
      }
  );
  }
  getCatId(name) { 
    let that = this;
    let catName = name;
    // this.getMembers();
    let allCats = this.productsCategory;
    allCats.forEach((e1) => {
    if(e1.name == catName) {
    that.finalCatId = e1._id;
    console.log("name: "+e1._id)
    return e1._id
      }
      }
  );
  }

  getProductId(name) { 
    let that = this;
    let pName = name;
    // this.getMembers();
    let products = this.allProducts;
    products.forEach((e1) => {
    if(e1.name == pName) {
    that.currentProductId = e1._id;
    console.log("name: "+e1._id)
      }
      }
  );
  }

  handleUpload(e) : void {
    let path = e.target.value
    this.imgSrc = '../../assets/' + path.replace(/^.*[\\\/]/, '');
    console.log(this.imgSrc);
 }

  test(t) {
    console.log('test:');
    console.log(t);
  }

  getAllproducts() {
    return this.crudservice.getAllproducts()
    .subscribe(
      products => {
        console.log(products);
        this.allProducts = products;
      }
    );
  }




}
