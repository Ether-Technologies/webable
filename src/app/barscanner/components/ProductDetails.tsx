import { PrimaryProductData, SecondaryProductData } from '../types';
import Image from 'next/image';
import { useState } from 'react';

interface ProductDetailsProps {
  productData: PrimaryProductData | SecondaryProductData;
  onReset: () => void;
}

const InfoItem = ({ title, value }: { title: string; value: string }) => (
  <div className="backdrop-blur-md bg-emerald-100/90 rounded-xl p-5 border-2 border-emerald-400/30 shadow-lg shadow-emerald-900/10 hover:shadow-emerald-900/20 transition-all duration-200">
    <h3 className="text-base md:text-lg font-bold text-emerald-900 mb-2">{title}</h3>
    <p className="text-base md:text-lg text-emerald-800">{value}</p>
  </div>
);

const ImageWithSkeleton = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full aspect-square max-w-md mx-auto rounded-xl overflow-hidden border-2 border-emerald-400/30 shadow-lg shadow-emerald-900/20">
      {isLoading && (
        <div className="absolute inset-0 bg-emerald-200 animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-contain transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  );
};

export default function ProductDetails({ productData, onReset }: ProductDetailsProps) {
  const isPrimary = 'product_name' in productData;

  const renderPrimaryProduct = (data: PrimaryProductData) => (
    <>
      <div className="flex justify-center items-center p-4">
        {data.image_front_url && (
          <ImageWithSkeleton src={data.image_front_url} alt={data.product_name} />
        )}
      </div>
      <div className="text-white p-4">
        <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 text-white tracking-tight">
          {data.product_name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <InfoItem title="Barcode" value={data.code} />
          <InfoItem title="Brand" value={data.brands} />
          <InfoItem title="Quantity" value={data.quantity} />
          <InfoItem title="Packaging" value={data.packaging} />
          <InfoItem title="Categories" value={data.categories} />
          <InfoItem title="Countries" value={data.countries} />
        </div>
      </div>
    </>
  );

  const renderSecondaryProduct = (data: SecondaryProductData) => (
    <>
      <div className="flex justify-center items-center p-4">
        {data.imageUrl && (
          <ImageWithSkeleton src={data.imageUrl} alt={data.name} />
        )}
      </div>
      <div className="text-white p-4">
        <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 text-white tracking-tight">
          {data.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <InfoItem title="Brand" value={data.brand} />
          <InfoItem title="Category" value={data.category} />
          <InfoItem title="Region" value={data.region} />
          <InfoItem title="EAN" value={data.ean.toString()} />
          {data.specs.map((spec, index) => (
            <InfoItem key={index} title={spec[0]} value={spec[1]} />
          ))}
        </div>
        {data.description && (
          <div className="mt-6 md:mt-8 backdrop-blur-md bg-emerald-100/90 rounded-xl p-5 border-2 border-emerald-400/30 shadow-lg shadow-emerald-900/10">
            <h3 className="text-lg md:text-xl font-bold text-emerald-900 mb-3">Description</h3>
            <p className="text-base md:text-lg text-emerald-800 leading-relaxed">{data.description}</p>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 md:p-8 shadow-2xl border-2 border-emerald-400/30">
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {isPrimary
          ? renderPrimaryProduct(productData as PrimaryProductData)
          : renderSecondaryProduct(productData as SecondaryProductData)}
      </div>
      <div className="flex justify-center mt-8 md:mt-10">
        <button
          onClick={onReset}
          className="px-8 py-4 text-lg bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl transition-all duration-200 ease-in-out border-2 border-emerald-400/50 hover:border-emerald-300/50 shadow-lg shadow-emerald-900/20"
        >
          Search Another Product
        </button>
      </div>
    </div>
  );
} 