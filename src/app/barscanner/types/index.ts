export interface PrimaryProductData {
  product_name: string;
  code: string;
  quantity: string;
  image_url: string;
  packaging: string;
  brands: string;
  categories: string;
  countries: string;
  image_front_url: string;
}

export interface SecondaryProductSpec {
  0: string;
  1: string;
}

export interface SecondaryProductData {
  name: string;
  description: string;
  region: string;
  imageUrl: string;
  brand: string;
  specs: SecondaryProductSpec[];
  category: string;
  categoryPath: string[];
  upc: string | null;
  ean: number;
}

export interface SecondaryApiResponse {
  code: string;
  codeType: string;
  product: SecondaryProductData;
  inferred: boolean;
}

export type ProductData = PrimaryProductData | SecondaryProductData; 