import { useState } from 'react';
import Navbar from '../Home/Navbar/Navbar';
import ProductCard from '../Global/ProductCard/ProductCard';
import ProductPopup from '../Global/ProductPopup/ProductPopup';
import type { Product } from '../../Types/product';
import './Products.css';

// Mock data for products
const products = [
  {
    id: 1,
    name: "Trendy Brown Coat",
    category: "Coats",
    image: "https://i.pinimg.com/1200x/8e/ea/13/8eea13aed6d66d753fb18a57f2f60693.jpg",
    price: 75.00,
    description: '',
    originalPrice: 150.00,
    discount: 50,
    rating: 4.8,
    size: 'L', // x
    color: 'black', // x
    quantity: 1, // x
    reserved: 0, // x
  },
  {
    id: 2,
    name: "Classy Light Coat",
    category: "Coats",
    image: "https://i.pinimg.com/1200x/52/34/f2/5234f25fa78fc103e303f3f9d93dfeee.jpg",
    price: 165.00,
    description: '',
    originalPrice: 220.00,
    discount: 25,
    rating: 4.9,
    size: 'M',
    color: 'black',
    quantity: 1,
    reserved: 0,
  },
  {
    id: 3,
    name: "Modern Brown Dress",
    category: "t-shirt",
    image: "https://i.pinimg.com/1200x/15/35/37/1535379e07b4b8a1dbf04a288763a71d.jpg",
    price: 90.00,
    description: '',
    originalPrice: 100.00,
    discount: 10,
    rating: 4.8,
    size: 'M',
    color: 'black',
    quantity: 1,
    reserved: 0,
  },
  {
    id: 4,
    name: "Modern Black T-Shirt",
    category: "t-shirt",
    image: "https://i.pinimg.com/1200x/27/b5/a1/27b5a1602087a7113d58118e357bdc54.jpg",
    price: 165.00,
    description: '',
    originalPrice: 220.00,
    discount: 25,
    rating: 4.9,
    size: 'M',
    color: 'black',
    quantity: 1,
    reserved: 0,
  },
  {
    id: 5,
    name: "Modern Black Dress",
    category: "t-shirt",
    image: "https://i.pinimg.com/736x/04/ba/46/04ba46bd3ecfe58f30f1c47820781227.jpg",
    price: 75.00,
    description: '',
    originalPrice: 100.00,
    discount: 25,
    rating: 4.7,
    size: 'L',
    color: 'black',
    quantity: 1,
    reserved: 0,
  },
  {
    id: 6,
    name: "Classy Light Coat",
    category: "Coats",
    image: "https://i.pinimg.com/736x/4c/d0/94/4cd094c4a57746a17cddf771a60b67db.jpg",
    price: 165.00,
    description: '',
    originalPrice: 220.00,
    discount: 25,
    rating: 4.9,
    size: 'M',
    color: 'black',
    quantity: 1,
    reserved: 0,
  },
  {
    id: 7,
    name: "Modern Black T-Shirt",
    category: "t-shirt",
    image: "https://i.pinimg.com/1200x/27/b5/a1/27b5a1602087a7113d58118e357bdc54.jpg",
    price: 165.00,
    description: '',
    originalPrice: 220.00,
    discount: 25,
    rating: 4.9,
    size: 'M',
    color: 'black',
    quantity: 1,
    reserved: 0,
  },
  {
    id: 8,
    name: "Modern pants",
    category: "Pants",
    image: "https://i.pinimg.com/1200x/65/bf/68/65bf68e8d9efa8a7129472953bc1a393.jpg",
    price: 165.00,
    description: '',
    originalPrice: 220.00,
    discount: 25,
    rating: 4.9,
    size: 'M',
    color: 'black',
    quantity: 1,
    reserved: 0,
  },
  {
    id: 9,
    name: "Modern Black Dress",
    category: "t-shirt",
    image: "https://i.pinimg.com/736x/04/ba/46/04ba46bd3ecfe58f30f1c47820781227.jpg",
    price: 75.00,
    description: '',
    originalPrice: 100.00,
    discount: 25,
    rating: 4.7,
    size: 'L',
    color: 'black',
    quantity: 1,
    reserved: 0,
  },
  {
    id: 10,
    name: "Classy Light Coat",
    category: "Coats",
    image: "https://i.pinimg.com/736x/4c/d0/94/4cd094c4a57746a17cddf771a60b67db.jpg",
    price: 165.00,
    description: '',
    originalPrice: 220.00,
    discount: 25,
    rating: 4.9,
    size: 'M',
    color: 'black',
    quantity: 1,
    reserved: 0,
  },
  {
    id: 11,
    name: "Modern Black T-Shirt",
    category: "t-shirt",
    image: "https://i.pinimg.com/1200x/27/b5/a1/27b5a1602087a7113d58118e357bdc54.jpg",
    price: 165.00,
    description: '',
    originalPrice: 220.00,
    discount: 25,
    rating: 4.9,
    size: 'M',
    color: 'black',
    quantity: 1,
    reserved: 0,
  },
  {
    id: 12,
    name: "Modern pants",
    category: "Pants",
    image: "https://i.pinimg.com/1200x/65/bf/68/65bf68e8d9efa8a7129472953bc1a393.jpg",
    price: 165.00,
    description: '',
    originalPrice: 220.00,
    discount: 25,
    rating: 4.9,
    size: 'M',
    color: 'black',
    quantity: 1,
    reserved: 0,
  },
];

// Filter categories (mock)
const filterCategories = [
  { name: "Coats & Jackets", subcategories: [] },
  { name: "Jeans", subcategories: [] },
  { name: "Hoodies & sweatshirts", subcategories: [] },
  { name: "T-shirts", subcategories: [] }
];

// Color options
const colors = [
  { name: "Black", value: "black" },
  { name: "White", value: "white" },
  { name: "Cream", value: "cream" },
  { name: "Grey", value: "grey" },
  { name: "Brown", value: "brown" },
  { name: "Green", value: "green" },
  { name: "Multicolor", value: "multicolor" }
];

// Size options
const sizes = ["XS", "S", "M", "L", "XL"];

function ProductPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
  };

  return (
    <div>
      <Navbar></Navbar>

      <div className="product-page container">
        {/* Header */}
        <header className="page-header">
          <h1>Products</h1>
        </header>

        <div className="page-content">
          {/* Sidebar */}
          <aside className="filter-sidebar">
            <div className="filter-section" style={{marginBottom: '1rem'}}>
              <h3>Filter</h3>
              <button className="reset-btn">Reset all</button>
            </div>

            {/* Categories */}
            <div className="filter-section">
              <p>
                <a className="collapsed-btn" data-bs-toggle="collapse" href="#cate" role="button" aria-expanded="false" aria-controls="collapseExample">
                  Categories
                </a>
              </p>
              <div className="collapse" id="cate">
                  {filterCategories.map((cat, idx) => (
                    <div key={idx} className="category-item">
                      <span>{cat.name}</span>
                      {cat.subcategories.length > 0 && <span className="chevron">›</span>}
                    </div>
                  ))}
              </div>

            </div>

            {/* Sizes */}
            <div className="filter-section">
              <p>
                <a className="collapsed-btn" data-bs-toggle="collapse" href="#sizes" role="button" aria-expanded="false" aria-controls="collapseExample">
                  Sizes
                </a>
              </p>
              <div className="collapse" id="sizes">
                <div className="size-grid">
                  {sizes.map(size => (
                    <button
                      key={size}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Colors */}
            <div className="filter-section">
              <p>
                <a className="collapsed-btn" data-bs-toggle="collapse" href="#colors" role="button" aria-expanded="false" aria-controls="collapseExample">
                  Colors
                </a>
              </p>
              <div className="collapse" id="colors">
                <div className="color-grid">
                  {colors.map(color => (
                    <label key={color.value} className="color-option">
                      <input
                        type="checkbox"
                      />
                      <span className="color-swatch" style={{ backgroundColor: getColorHex(color.value) }}></span>
                      <span className="color-label">{color.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

          </aside>

          {/* Main content */}
          <main className="products-main">
            <div className="products-grid">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={handleProductClick}
                />
              ))}
            </div>
          </main>
        </div>

        {selectedProduct && (
          <ProductPopup
            product={selectedProduct}
            onClose={handleClosePopup}
          />
        )}
      </div>
    </div>
  );
}

// Helper function to get color hex codes
function getColorHex(colorName: string) {
  const colors = {
    black: "#000000",
    white: "#FFFFFF",
    cream: "#FFFDD0",
    grey: "#808080",
    brown: "#A52A2A",
    green: "#008000",
    multicolor: "linear-gradient(45deg, #FF5733, #33FF57, #3357FF)"
  } as const;
  return colors[colorName as keyof typeof colors] || "#CCCCCC";
}

export default ProductPage;