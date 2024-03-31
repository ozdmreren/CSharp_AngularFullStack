import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from '../../../../types/IProduct';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  template: `
    <div class="flex w-full justify-center">
      <div>
        <div class="text-center text-lg text-slate-600 font-light">
          Ürün Oluştur
        </div>
        <form
          [formGroup]="frm"
          (ngSubmit)="onSubmit()"
          class="w-[700px] px-5 py-6 space-y-3"
        >
          <div
            class="w-full border
          {{
              productFeaturesObject.productName().valid ||
              (productFeaturesObject.productName().dirty &&
                productFeaturesObject.productName().touched)
                ? ''
                : 'border-rose-500'
            }}
            "
          >
            <input
              id="asa"
              autocomplete="off"
              [ngClass]="inputStyle"
              type="text"
              placeholder="Product Name"
              formControlName="productName"
              required
            />
          </div>
          <div
            class="w-full border
          {{
              productFeaturesObject.productBrand().valid ||
              (productFeaturesObject.productBrand().dirty &&
                productFeaturesObject.productBrand().touched)
                ? ''
                : 'border-rose-500'
            }}
          "
          >
            <input
              [ngClass]="inputStyle"
              type="text"
              placeholder="Product Brand"
              formControlName="productBrand"
              required
            />
          </div>
          <div
            class="w-full
          "
          >
            <textarea
              class="max-h-[150px] min-h-[150px] w-full p-4 pt-6 border-2 rounded-md outline-none"
              placeholder="Product Description"
              formControlName="productDescription"
            ></textarea>
          </div>
          <div
            class="w-full border
          {{
              !productFeaturesObject.productPrice().value &&
              (productFeaturesObject.productPrice().dirty ||
                productFeaturesObject.productPrice().touched)
                ? 'border-rose-500'
                : ''
            }}
          "
          >
            <input
              [ngClass]="inputStyle"
              type="number"
              placeholder="Product Price"
              formControlName="productPrice"
              required
            />
          </div>
          <div class="w-full flex gap-3">
            <input
              [ngClass]="checkboxStyle"
              type="checkbox"
              formControlName="inStock"
            />
            <label for="" class="text-slate-400 select-none">InStock?</label>
          </div>
          <div
            class="
                flex
                items-center
                justify-center
                bg-slate
                w-full
                my-4
                py-5
                border-b-[1px]
                border-b-green-100
                shadow-sm
    "
          >
            <div
              class="grid grid-cols-4
                  md:px-6 xl:px-12 px-3
                  gap-2
        "
            >
              @for (categ of categories; track $index) {
              <div
                class="
                    flex
                    overflow-x-hidden
                    items-center
                    justify-center
                    gap-2 
                    p-3 mx-2
                    border 
                    rounded-sm
                    border-slate-300
                    cursor-pointer
                    max-w-[135px]
                    w-full
                    {{
                  selectedCategoryIndex === $index
                    ? 'transition duration-500 border border-slate-800'
                    : ''
                }}
         "
                (click)="handleSelectCategory($index)"
              >
                <span [ngClass]="categ.iconClass">{{ categ.iconName }}</span>
                <div class="category">
                  {{ categ.category }}
                </div>
              </div>
              }
            </div>
          </div>
          <div formGroupName="images" class="flex flex-col gap-4">
            <div class="flex gap-4">
              <div class="flex items-center gap-3">
                <input
                  class="outline-none border px-3 py-1 text-sm text-slate-700"
                  type="text"
                  placeholder="color"
                  formControlName="productImage1Color"
                />
              </div>
              <input
                class="outline-none border px-3 text-sm text-slate-700"
                type="text"
                placeholder="color code"
                formControlName="productImage1ColorCode"
              />
              <input type="file" formControlName="productImage1" />
            </div>
            <div class="flex gap-4">
              <div class="flex items-center gap-3">
                <input
                  class="outline-none border px-3 py-1 text-sm text-slate-700"
                  type="text"
                  placeholder="color"
                  formControlName="productImage2Color"
                />
              </div>
              <input
                class="outline-none border px-3 text-sm text-slate-700"
                type="text"
                placeholder="Color code"
                formControlName="productImage2ColorCode"
              />
              <input type="file" formControlName="productImage2" />
            </div>
            <div class="flex gap-4">
              <div class="flex items-center gap-3">
                <input
                  class="outline-none border px-3 py-1 text-sm text-slate-700"
                  type="text"
                  placeholder="color"
                  formControlName="productImage3Color"
                />
              </div>
              <input
                class="outline-none border px-3 text-sm text-slate-700"
                type="text"
                placeholder="Color code"
                formControlName="productImage3ColorCode"
              />
              <input type="file" formControlName="productImage3" />
            </div>
          </div>
          <div class="w-full flex items-center justify-center mt-5 py-8">
            <button
              class="w-[80%] px-2 py-3
               rounded-md bg-slate-200 
               shadow-md text-slate-700
                text-base
                transition
                duration-500
                hover:scale-105
                hover:border
                hover:border-slate-800
                "
            >
              Ürünü Oluştur
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class CreateComponent {
  selectedCategoryIndex: number = -1;
  htmlCategories = document.querySelectorAll('.category');
  inputStyle = 'w-full py-4 outline-none px-3 text-base text-slate-500';
  checkboxStyle = 'py-4 outline-none px-3 text-base text-slate-500';
  frm: FormGroup;
  adminPanel = [
    {
      url: '/',
      link: 'Özet',
    },
    {
      url: 'create',
      link: 'Ürün Oluştur',
    },
    {
      url: 'manage',
      link: 'Yönet',
    },
  ];
  categories = [
    {
      category: 'Computer',
      iconClass: 'material-symbols-outlined',
      iconName: 'computer',
    },
    {
      category: 'Keyboard',
      iconClass: 'material-symbols-outlined',
      iconName: 'keyboard',
    },
    {
      category: 'Mouse',
      iconClass: 'material-symbols-outlined',
      iconName: 'mouse',
    },
    {
      category: 'Phone',
      iconClass: 'material-symbols-outlined',
      iconName: 'smartphone',
    },
    {
      category: 'Watch',
      iconClass: 'material-symbols-outlined',
      iconName: 'watch',
    },
    {
      category: 'Headphone',
      iconClass: 'material-symbols-outlined',
      iconName: 'headphones',
    },
    {
      category: 'Smart Toy',
      iconClass: 'material-symbols-outlined',
      iconName: 'smart_toy',
    },
    {
      category: 'Game Pad',
      iconClass: 'material-symbols-outlined',
      iconName: 'gamepad',
    },
  ];
  productFeaturesObject = {
    productName: () => {
      return this.frm.get('productName');
    },
    productBrand: () => {
      return this.frm.get('productBrand');
    },
    productCategory: () => {
      return this.frm.get('productCategory');
    },
    productDescription: () => {
      return this.frm.get('productDescription');
    },
    productPrice: () => {
      return this.frm.get('productPrice');
    },
    inStock: () => {
      return this.frm.get('inStock');
    },
  };

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private httpClient: HttpClient,
    private adminService: AdminService
  ) {
    this.frm = formBuilder.group({
      productName: ['', [Validators.required]],
      productBrand: ['', [Validators.required]],
      productCategory: ['', [Validators.required]],
      productDescription: ['', [Validators.required]],
      productPrice: ['', [Validators.required]],
      images: formBuilder.group({
        productImage1: [''],
        productImage1Color: [''],
        productImage1ColorCode: [''],
        productImage2: [''],
        productImage2Color: [''],
        productImage2ColorCode: [''],
        productImage3: [''],
        productImage3Color: [''],
        productImage3ColorCode: [''],
      }),
      inStock: [false],
    });
  }
  onSubmit() {
    if (
      !this.productFeaturesObject.inStock().valid ||
      !this.productFeaturesObject.productBrand().valid ||
      !this.productFeaturesObject.productCategory().valid ||
      !this.productFeaturesObject.productDescription().valid ||
      !this.productFeaturesObject.productName().valid ||
      !this.productFeaturesObject.productPrice().valid
    ) {
      this.toastr.warning('Uygun değerleri giriniz');
      return;
    }
    this.handleCreateProduct();
    this.toastr.success('Ürün oluşturuldu');
  }
  handleSelectCategory(index: number) {
    this.selectedCategoryIndex = index;
    this.frm.get('productCategory').setValue(this.categories[index].category);
  }
  handleCreateProduct() {
    const images = [];
    for (let i = 1; i <= 3; i++) {
      const image = {
        imagePath: this.frm.get('images').get(`productImage${i}`).value,
        imageColor: this.frm.get('images').get(`productImage${i}Color`).value,
        imageColorCode: this.frm.get('images').get(`productImage${i}ColorCode`)
          .value,
      };
      images.push(image);
    }
    const createdProduct: any = {
      productName: this.productFeaturesObject.productName().value,
      productDescription: this.productFeaturesObject.productDescription().value,
      productBrand: this.productFeaturesObject.productBrand().value,
      productCategory: this.productFeaturesObject.productCategory().value,
      images: images,
      productPrice: this.productFeaturesObject.productPrice().value,
      inStock: this.productFeaturesObject.inStock().value,
    };
    console.log(createdProduct, 'SEA');
    // const produqwqw = {
    //   productName: 'string',
    //   productDescription: 'string',
    //   productBrand: 'string',
    //   productCategory: 'string',
    //   images: [
    //     {
    //       imagePath: this.frm.get('images').get(`productImage1`).value,
    //       imageColor: 'string',
    //       imageColorCode: 'string',
    //     },
    //   ],
    //   productPrice: 0,
    //   inStock: true,
    // };
    this.adminService.handleCreateProduct(createdProduct).subscribe(
      (observer) => {
        console.log(observer);
      },
      (error) => console.log(error)
    );
  }
  handleGetProducts() {
    this.adminService
      .handleGetProducts()
      .subscribe((observer) => console.log(observer));
  }
}
