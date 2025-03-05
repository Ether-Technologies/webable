'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ProductData {
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

export default function Home() {
  const [manualBarcode, setManualBarcode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [productData, setProductData] = useState<ProductData | null>(null)

  const searchBarcode = async () => {
    if (!manualBarcode) {
      setError('Please enter a barcode')
      return
    }

    setIsLoading(true)
    setError(null)
    setProductData(null)

    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${manualBarcode}.json`)
      
      if (!response.ok) {
        throw new Error('Network error fetching product data')
      }

      const data = await response.json()

      if (data.status === 1) {
        setProductData({
          product_name: data.product.product_name_en || data.product.product_name || 'N/A',
          code: data.product.code || 'N/A',
          quantity: data.product.quantity || 'N/A',
          image_url: data.product.image_url || '',
          packaging: data.product.packaging || 'N/A',
          brands: data.product.brands || 'N/A',
          categories: data.product.categories || 'N/A',
          countries: data.product.countries || 'N/A',
          image_front_url: data.product.image_front_url || '',
        })
        setManualBarcode('') // Clear input after successful search
      } else {
        setError('Product not found')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch product data')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchBarcode()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Logo and Header */}
        <div className="flex justify-center mb-12">
          <Image
            src="/Logo-neoshift.svg"
            alt="Neoshift Logo"
            width={200}
            height={72}
            className="mb-8"
          />
        </div>

        {/* Search Section */}
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 shadow-2xl mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Enter Product Barcode
          </h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <input
              type="text"
              value={manualBarcode}
              onChange={(e) => setManualBarcode(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter barcode number"
              className="w-full md:w-96 px-6 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm"
              disabled={isLoading}
            />
            <button
              onClick={searchBarcode}
              disabled={isLoading || !manualBarcode}
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white rounded-lg transition-all duration-200 ease-in-out font-medium min-w-[120px]"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {/* Product Details */}
        {productData && (
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="flex justify-center items-center">
                {productData.image_front_url && (
                  <img
                    src={productData.image_front_url}
                    alt={productData.product_name}
                    className="max-w-full h-auto rounded-lg shadow-lg"
                  />
                )}
              </div>

              {/* Product Information */}
              <div className="text-white">
                <h2 className="text-3xl font-bold mb-6">{productData.product_name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoItem title="Barcode" value={productData.code} />
                  <InfoItem title="Brand" value={productData.brands} />
                  <InfoItem title="Quantity" value={productData.quantity} />
                  <InfoItem title="Packaging" value={productData.packaging} />
                  <InfoItem title="Categories" value={productData.categories} />
                  <InfoItem title="Countries" value={productData.countries} />
                </div>

                <button
                  onClick={() => {
                    setProductData(null)
                    setManualBarcode('')
                  }}
                  className="mt-8 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 ease-in-out border border-white/20"
                >
                  Search Another Product
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="backdrop-blur-lg bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center text-white">
            <p className="mb-4">{error}</p>
            <button
              onClick={() => {
                setError(null)
                setManualBarcode('')
              }}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 ease-in-out"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// InfoItem Component
const InfoItem = ({ title, value }: { title: string; value: string }) => (
  <div className="backdrop-blur-sm bg-white/5 rounded-lg p-4 border border-white/10">
    <h3 className="text-sm font-medium text-white/70 mb-1">{title}</h3>
    <p className="text-white">{value}</p>
  </div>
) 