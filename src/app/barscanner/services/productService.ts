import { PrimaryProductData, SecondaryApiResponse } from '../types';

export async function fetchPrimaryProduct(barcode: string): Promise<PrimaryProductData> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_PRIMARY_LOOKUP}/${barcode}.json`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Network error fetching product data');
  }

  const data = await response.json();

  if (data.status !== 1) {
    throw new Error('Product not found');
  }

  return {
    product_name: data.product.product_name_en || data.product.product_name || 'N/A',
    code: data.product.code || 'N/A',
    quantity: data.product.quantity || 'N/A',
    image_url: data.product.image_url || '',
    packaging: data.product.packaging || 'N/A',
    brands: data.product.brands || 'N/A',
    categories: data.product.categories || 'N/A',
    countries: data.product.countries || 'N/A',
    image_front_url: data.product.image_front_url || '',
  };
}

export async function fetchSecondaryProduct(barcode: string): Promise<SecondaryApiResponse> {
  const response = await fetch(`/api/lookup/${barcode}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Network error fetching product data');
  }

  const data = await response.json();

  if (!data.product) {
    throw new Error('Product not found');
  }

  return data;
}

export async function fetchProduct(barcode: string) {
  const approach = process.env.NEXT_PUBLIC_APPROACH || 'primary';
  
  try {
    if (approach === 'secondary') {
      const data = await fetchSecondaryProduct(barcode);
      return data.product;
    } else {
      return await fetchPrimaryProduct(barcode);
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
} 