'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ProductData } from './types'
import SearchBar from './components/SearchBar'
import ProductDetails from './components/ProductDetails'
import ErrorMessage from './components/ErrorMessage'
import { fetchProduct } from './services/productService'

export default function Home() {
  const [manualBarcode, setManualBarcode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [productData, setProductData] = useState<ProductData | null>(null)

  const searchBarcode = async (barcode: string) => {
    if (!barcode) {
      setError('Please enter a barcode')
      return
    }

    setIsLoading(true)
    setError(null)
    setProductData(null)

    try {
      const data = await fetchProduct(barcode)
      setProductData(data)
      setManualBarcode('') // Clear input after successful search
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch product data')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setProductData(null)
    setManualBarcode('')
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Logo and Header */}
        <div className="flex justify-center mb-8 md:mb-12">
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-4 md:p-6 border-2 border-emerald-400/30 shadow-lg shadow-emerald-900/20">
            <Image
              src="/Logo-neoshift.svg"
              alt="Neoshift Logo"
              width={180}
              height={65}
              className="w-40 md:w-[180px] h-auto"
              priority
            />
          </div>
        </div>

        <SearchBar
          onSearch={searchBarcode}
          isLoading={isLoading}
          manualBarcode={manualBarcode}
          setManualBarcode={setManualBarcode}
        />

        {productData && <ProductDetails productData={productData} onReset={handleReset} />}
        
        {error && <ErrorMessage message={error} onReset={handleReset} />}
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