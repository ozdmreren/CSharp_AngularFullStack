export interface IProduct {
  productName: string;
  productBrand: string;
  productCategory: string;
  productDescription: string;
  productPrice: string;
  inStock: boolean;
  images: ProductImagesProps[];
}

export interface ProductImagesProps {
  imagePath: string;
  imageColor: string;
  imageColorCode: string;
}
