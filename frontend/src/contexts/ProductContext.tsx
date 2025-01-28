import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

interface Product {
  id: number
  name: string
  price: number
  active?: boolean
}

interface ProductContextType {
  products: Product[]
  addProduct: (product: Product) => void
  updateProduct: (product: Product) => void
  deleteProduct: (id: number) => void
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export const useProductContext = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider")
  }
  return context
}

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([])

  const addProduct = (product: Product) => {
    setProducts([...products, product])
  }

  const updateProduct = (updatedProduct: Product) => {
    setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)))
  }

  const deleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  )
}

