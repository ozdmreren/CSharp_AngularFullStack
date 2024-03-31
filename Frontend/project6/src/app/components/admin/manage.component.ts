import { NgClass } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { IProduct } from '../../../../types/IProduct';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [NgClass, RouterLink, ReactiveFormsModule],
  template: `
    <div class=" mx-auto py-10 w-full">
      <div class="px-14">
        <div class="text-center text-xl text-slate-500">ÜRÜNLERİ YÖNET</div>
        <div class="grid grid-cols-6 mt-6 text-center gap-2">
          <div class="{{ titleStyles }}">ID</div>
          <div class="{{ titleStyles }}">Product Name</div>
          <div class="{{ titleStyles }}">Product Category</div>
          <div class="{{ titleStyles }}">Product Price</div>
          <div class="{{ titleStyles }}">Product Quantity</div>
          <div class="{{ titleStyles }}">Action</div>
        </div>
        @for (product of products; track $index) {
        <div class="border grid grid-cols-6 text-center gap-2 mt-5 py-2 px-3">
          <div class="font-bold flex items-center">
            {{ product.productId }}
          </div>
          <div class="text-slate-700 flex items-center justify-center">
            {{ product.productName }}
          </div>
          <div class="text-amber-500 flex items-center justify-center">
            {{ product.productCategory }}
          </div>
          <div class="text-teal-500 flex items-center justify-center">
            {{ product.productPrice }} ₺
          </div>
          <div class="flex items-center justify-center">sd</div>
          <div>
            <div class="flex items-center justify-center gap-2">
              <div
                class="{{
                  actionStyles
                }} transition duration-300 hover:text-purple-400 select-none"
                (click)="handleUpdateBox(product.productId)"
              >
                <span class="material-symbols-outlined"> update </span>
              </div>
              <div
                class="{{
                  actionStyles
                }} transition duration-300 hover:text-red-600 text-red-500 select-none"
                (click)="handleDeleteProduct(product.productId)"
              >
                <span class="material-symbols-outlined"> delete </span>
              </div>
              <div
                class="{{
                  actionStyles
                }} transition duration-300 hover:text-white select-none"
                routerLink="/products/{{ product.productId }}"
              >
                <span class="material-symbols-outlined"> visibility </span>
              </div>
            </div>
          </div>
        </div>
        } @if (openUpdateBox) {
        <div
          class="relative flex justify-center w-[75%]
           py-10 translate-x-40
           min-h-fit
          "
        >
          <div class="rounded-lg shadow-lg">
            <form
              [formGroup]="frm"
              class="w-full h-full px-5 py-4 border space-y-3"
              (ngSubmit)="onSubmit()"
            >
              <div class="w-full">
                <h1 class="text-center px-3 w-full py-2 text-lg outline-none">
                  {{ updatedProduct.productId }}
                </h1>
              </div>

              <div class="w-full flex items-center gap-2 justify-between">
                <label class="text-lg w-[30%]">ProductName</label>
                <input
                  class="outline-none px-2 py-1 border text-lg"
                  type="text"
                  placeholder="{{ updatedProduct.productName }}"
                  formControlName="productName"
                />
              </div>

              <div class="w-full flex items-center gap-2 justify-between">
                <label class="text-lg w-[30%]">ProductDescription</label>
                <input
                  class="outline-none px-2 py-1 border text-lg"
                  type="text"
                  placeholder="{{ updatedProduct.productDescription }}"
                  formControlName="productDescription"
                />
              </div>

              <div class="w-full flex items-center gap-2 justify-between">
                <label class="text-lg w-[30%]">ProductPrice</label>
                <input
                  class="outline-none px-2 py-1 border text-lg"
                  type="number"
                  placeholder="{{ updatedProduct.productPrice }}"
                  formControlName="productPrice"
                />
              </div>

              <div class="w-full flex items-center gap-2 justify-between">
                <label class="text-lg w-[30%]">ProductBrand</label>
                <input
                  class="outline-none px-2 py-1 border text-lg"
                  type="text"
                  placeholder="{{ updatedProduct.productBrand }}"
                  formControlName="productBrand"
                />
              </div>
              <div class="w-full flex items-center gap-2 justify-evenly">
                <label for="inStock" class="text-lg">InStock</label>
                <input
                  class="outline-none px-2 py-1 border text-lg"
                  type="checkbox"
                  id="inStock"
                  placeholder="{{ updatedProduct.inStock }}"
                  formControlName="inStock"
                />
              </div>
              <div class="grid grid-cols-4 ">
                @for (item of categories; track $index) {
                <div
                  class="flex gap-2 min-w-[120px] min-h-[60px] mr-4 my-3 px-2 py-3 rounded-md items-center justify-center border cursor-pointer
                  transition-colors duration-300
                  {{
                    selectedIndex == $index
                      ? 'border-[1.2px] border-slate-500'
                      : ''
                  }}
                  "
                  (click)="handleSelectCategory($index)"
                >
                  <span class="{{ item.iconClass }}">{{ item.iconName }}</span>
                  <div class="text-justify">{{ item.category }}</div>
                </div>
                }
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
                      class="outline-none border px-3 py-1  text-slate-700"
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
              <div class="w-full flex items-center justify-center">
                <button
                  class="px-3 py-4 w-full text-white text-base rounded-md bg-slate-700 duration-300 hover:bg-slate-900"
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
        }
      </div>
    </div>
  `,
})
export class ManageComponent implements OnInit {
  frm: FormGroup;
  titleStyles: string = 'border rounded-sm border-r-[1.2px]';
  actionStyles: string =
    'p-1 flex items-center rounded-md bg-slate-500 cursor-pointer';
  products: any; // Başlangıçta boş bir dizi olarak tanımlanmalıdır
  openUpdateBox: boolean = false;
  updatedProduct: any;
  selectedIndex = -1;
  upProduct;
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
    private adminService: AdminService,
    private toastr: ToastrService,
    public formBuilder: FormBuilder,
    private httpService: HttpClient
  ) {
    this.frm = this.formBuilder.group({
      productName: [''],
      productBrand: [''],
      productCategory: [''],
      productDescription: [''],
      productPrice: [''],
      images: this.formBuilder.group({
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
      inStock: [''],
    });
  }

  ngOnInit(): void {
    this.adminService.handleGetProducts().subscribe((observer: any) => {
      this.products = observer;
      console.log(this.products);
    });
  }
  handleDeleteProduct(productId: any) {
    try {
      console.log(productId);
      this.adminService.handleDeleteProduct(productId).subscribe((observer) => {
        console.log(observer, 'ama sır vermez');
      });
      this.toastr.success('Ürün kaldırıldı');
    } catch (err) {
      this.toastr.error('Ürün kaldırılamadı');
    } finally {
      setTimeout(() => {
        location.reload();
      }, 2000);
    }
  }
  handleUpdateBox(productId: any) {
    this.openUpdateBox = !this.openUpdateBox;
    this.adminService.handleGetProducts().subscribe((observer: any[]) => {
      this.updatedProduct = observer.find(
        (proc) => proc.productId == productId
      );
      console.log(this.updatedProduct);
    });
    console.log(productId);
  }
  async handleUpdateProduct() {
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
    this.upProduct = {
      productId: this.updatedProduct.productId,
      productName: this.productFeaturesObject.productName().value,
      productDescription: this.productFeaturesObject.productDescription().value,
      productBrand: this.productFeaturesObject.productBrand().value,
      productCategory: this.productFeaturesObject.productCategory().value,
      images: images,
      productPrice: this.productFeaturesObject.productPrice().value,
      inStock: this.productFeaturesObject.inStock().value,
    };
  }
  async onSubmit() {
    await this.handleUpdateProduct();
    console.log(this.upProduct, 'SA');
    // const produqwqw = {
    //   productId: '65f2e8430a0ab92bb0a2797b',
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

    let isErr: boolean = true;
    this.adminService.handleUpdateProduct(this.upProduct).subscribe({
      next: (observer) => console.log(observer, 'Sır vermez'),
      error: (err) => {
        err ? console.log(err) : (isErr = !isErr);
      },
      complete: () => console.log('completed'),
    });
    if (!isErr) {
      this.toastr.error('Ürün güncellenemedi hata');
    } else {
      this.toastr.info('Ürün başarıyla güncellendi');
    }
  }
  handleSelectCategory($index) {
    this.selectedIndex = $index;
    this.frm.get('productCategory').setValue(this.categories[$index].category);
  }
  truncateText(value: string) {
    if (value.length < 20) {
      return value;
    } else {
      return value.substring(0, 20) + '...';
    }
  }
}
