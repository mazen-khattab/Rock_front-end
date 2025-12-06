import React, { useState, useEffect } from 'react';
import './Products.css';

// Mock data for products
const products = [
  {
    id: 1,
    name: "Sherpa puffer jacket",
    price: 85.00,
    image: "https://via.placeholder.com/300x400?text=Sherpa+Puffer",
    category: "Coats & Jackets",
    discount: null,
    colors: ["Black", "White"],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: 2,
    name: "Down jacket",
    price: 120.00,
    image: "https://via.placeholder.com/300x400?text=Down+Jacket",
    category: "Coats & Jackets",
    discount: null,
    colors: ["White", "Grey"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 3,
    name: "Classic coat with wool blend",
    price: 100.00,
    image: "https://via.placeholder.com/300x400?text=Classic+Coat",
    category: "Coats & Jackets",
    discount: 20,
    colors: ["Grey", "Beige"],
    sizes: ["M", "L", "XL", "XXL"]
  },
  {
    id: 4,
    name: "Sherpa jacket",
    price: 95.00,
    originalPrice: 120.00,
    image: "https://via.placeholder.com/300x400?text=Sherpa+Jacket",
    category: "Coats & Jackets",
    discount: 20,
    colors: ["Grey", "Brown"],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: 5,
    name: "Hooded coat",
    price: 60.00,
    image: "https://via.placeholder.com/300x400?text=Hooded+Coat",
    category: "Coats & Jackets",
    discount: null,
    colors: ["Green", "Olive"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 6,
    name: "Hooded jacket",
    price: 75.00,
    image: "https://via.placeholder.com/300x400?text=Hooded+Jacket",
    category: "Coats & Jackets",
    discount: null,
    colors: ["Black", "Navy"],
    sizes: ["M", "L", "XL"]
  },
  {
    id: 7,
    name: "Faux leather quilted jacket",
    price: 85.00,
    image: "https://via.placeholder.com/300x400?text=Faux+Leather",
    category: "Coats & Jackets",
    discount: null,
    colors: ["Black", "Brown"],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: 8,
    name: "Faux suede jacket",
    price: 45.00,
    originalPrice: 60.00,
    image: "https://via.placeholder.com/300x400?text=Faux+Suede",
    category: "Coats & Jackets",
    discount: 25,
    colors: ["Navy", "Beige"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 9,
    name: "Wool blend shacket",
    price: 55.00,
    image: "https://via.placeholder.com/300x400?text=Wool+Shacket",
    category: "Coats & Jackets",
    discount: null,
    colors: ["Plaid", "Green"],
    sizes: ["M", "L", "XL", "XXL"]
  },
  {
    id: 10,
    name: "Trench coat",
    price: 150.00,
    image: "https://via.placeholder.com/300x400?text=Trench+Coat",
    category: "Coats & Jackets",
    discount: 10,
    colors: ["Beige", "Black"],
    sizes: ["S", "M", "L"]
  }
];

// Filter categories (mock)
const filterCategories = [
  { name: "Winter outfits", subcategories: ["Coats", "Jackets"] },
  { name: "Coats & Jackets", subcategories: ["Coats", "Jackets", "Quilted jackets", "Leather jackets"] },
  { name: "Jumpers, Cardigans", subcategories: [] },
  { name: "Shirts", subcategories: [] },
  { name: "Blazers", subcategories: [] },
  { name: "Trousers", subcategories: [] },
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
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

// Material options
const materials = [
  "Combined materials",
  "Corduroy",
  "Cotton",
  "Jeans",
  "Leather",
  "Wool",
  "Recycled polyester"
];

function ProductPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSizes, setSelectedSizes] = useState(new Set());
  const [selectedColors, setSelectedColors] = useState(new Set());
  const [priceRange, setPriceRange] = useState([30, 150]);
  const [selectedMaterials, setSelectedMaterials] = useState(new Set());

  // Filter products based on selections
  const filteredProducts = products.filter(product => {
    // Category filter
    if (selectedCategory && !product.category.toLowerCase().includes(selectedCategory.toLowerCase())) {
      return false;
    }

    // Size filter
    if (selectedSizes.size > 0) {
      const hasMatchingSize = [...selectedSizes].some(size => product.sizes.includes(size));
      if (!hasMatchingSize) return false;
    }

    // Color filter
    if (selectedColors.size > 0) {
      const hasMatchingColor = [...selectedColors].some(color => 
        product.colors?.includes(color)
      );
      if (!hasMatchingColor) return false;
    }

    // Price filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }

    // Material filter (not in mock data, so skip for now)
    // You can extend product data to include material

    return true;
  });

  // Toggle size selection
  const toggleSize = (size) => {
    const newSizes = new Set(selectedSizes);
    if (newSizes.has(size)) {
      newSizes.delete(size);
    } else {
      newSizes.add(size);
    }
    setSelectedSizes(newSizes);
  };

  // Toggle color selection
  const toggleColor = (color) => {
    const newColors = new Set(selectedColors);
    if (newColors.has(color)) {
      newColors.delete(color);
    } else {
      newColors.add(color);
    }
    setSelectedColors(newColors);
  };

  // Toggle material selection
  const toggleMaterial = (material) => {
    const newMaterials = new Set(selectedMaterials);
    if (newMaterials.has(material)) {
      newMaterials.delete(material);
    } else {
      newMaterials.add(material);
    }
    setSelectedMaterials(newMaterials);
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedCategory("");
    setSelectedSizes(new Set());
    setSelectedColors(new Set());
    setPriceRange([30, 150]);
    setSelectedMaterials(new Set());
  };

  return (
    <div className="product-page">
      {/* Header */}
      <header className="page-header">
        <h1>Coats & jackets</h1>
        <div className="header-actions">
          <button className="sort-btn">New</button>
          <button className="sort-btn sale">Sale 20%</button>
        </div>
      </header>

      <div className="page-content">
        {/* Sidebar */}
        <aside className="filter-sidebar">
          <div className="filter-section">
            <h3>Filter</h3>
            <button className="reset-btn" onClick={resetFilters}>Reset all</button>
          </div>

          {/* Categories */}
          <div className="filter-section">
            <h4>Categories</h4>
            {filterCategories.map((cat, idx) => (
              <div key={idx} className="category-item">
                <span>{cat.name}</span>
                {cat.subcategories.length > 0 && <span className="chevron">›</span>}
              </div>
            ))}
          </div>

          {/* Sizes */}
          <div className="filter-section">
            <h4>Sizes</h4>
            <div className="size-grid">
              {sizes.map(size => (
                <button
                  key={size}
                  className={`size-btn ${selectedSizes.has(size) ? 'selected' : ''}`}
                  onClick={() => toggleSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="filter-section">
            <h4>Colors</h4>
            <div className="color-grid">
              {colors.map(color => (
                <label key={color.value} className="color-option">
                  <input
                    type="checkbox"
                    checked={selectedColors.has(color.name)}
                    onChange={() => toggleColor(color.name)}
                  />
                  <span className="color-swatch" style={{ backgroundColor: getColorHex(color.value) }}></span>
                  <span className="color-label">{color.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="filter-section">
            <h4>Price</h4>
            <div className="price-slider">
              <input
                type="range"
                min="30"
                max="150"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="slider"
              />
              <input
                type="range"
                min="30"
                max="150"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])
                }
                className="slider"
              />
              <div className="price-values">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Material */}
          <div className="filter-section">
            <h4>Material</h4>
            <div className="material-list">
              {materials.map(material => (
                <label key={material} className="material-option">
                  <input
                    type="checkbox"
                    checked={selectedMaterials.has(material)}
                    onChange={() => toggleMaterial(material)}
                  />
                  <span>{material}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="products-main">
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image-wrapper">
                  <img src={product.image} alt={product.name} className="product-image" />
                  {product.discount && (
                    <div className="discount-badge">-{product.discount}%</div>
                  )}
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-price">
                    {product.originalPrice && (
                      <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                    )}
                    <span className={`current-price ${product.originalPrice ? 'on-sale' : ''}`}>
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

// Helper function to get color hex codes
function getColorHex(colorName) {
  const colors = {
    black: "#000000",
    white: "#FFFFFF",
    cream: "#FFFDD0",
    grey: "#808080",
    brown: "#A52A2A",
    green: "#008000",
    multicolor: "linear-gradient(45deg, #FF5733, #33FF57, #3357FF)"
  };
  return colors[colorName] || "#CCCCCC";
}

export default ProductPage;