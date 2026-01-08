import { useState } from 'react';
import Navbar from '../Home/Navbar/Navbar';
import ProductCard from '../Global/ProductCard/ProductCard';
import ProductPopup from '../Global/ProductPopup/ProductPopup';
import type { Product } from '../../Types/product';
import './Products.css';

// Mock data for products
const products = [
  // ================= T-SHIRTS =================
  {
    id: 1,
    name: "Rock Classic T-Shirt",
    category: "t-shirt",
    price: 500,
    originalPrice: 650,
    description: "Classic everyday t-shirt",
    discount: 20,
    rating: 4.5,
    variants: [
      {
        id: 101,
        gallery: [
          "https://i.pinimg.com/736x/8a/15/3a/8a153a1339db8fac314f047986096b65.jpg",
          "https://i.pinimg.com/1200x/c7/41/b1/c741b15bc043c465f3990d39d9ff0a89.jpg",
          "https://i.pinimg.com/1200x/ce/17/cf/ce17cfaf7b95b61330fd196c59f2963a.jpg"
        ],
        colorId: 1,
        color: "Black",
        sizeId: 1,
        size: "M",
        quantity: 25,
        reserved: 4
      },
      {
        id: 102,
        gallery: [
          "https://i.pinimg.com/1200x/1f/30/24/1f3024f71606f351c3886a5fc9e0bf94.jpg",
          "https://i.pinimg.com/1200x/1d/b4/f6/1db4f6a0f34dd153b1ed71622caeda44.jpg",
          "https://i.pinimg.com/1200x/77/27/76/772776f5b6209709a2b989d411965487.jpg"
        ],
        colorId: 2,
        color: "White",
        sizeId: 2,
        size: "L",
        quantity: 20,
        reserved: 3
      },
      {
        id: 109,
        gallery: [
          "https://i.pinimg.com/1200x/1f/30/24/1f3024f71606f351c3886a5fc9e0bf94.jpg",
          "https://i.pinimg.com/1200x/1d/b4/f6/1db4f6a0f34dd153b1ed71622caeda44.jpg",
          "https://i.pinimg.com/1200x/77/27/76/772776f5b6209709a2b989d411965487.jpg"
        ],
        colorId: 2,
        color: "White",
        sizeId: 2,
        size: "XL",
        quantity: 20,
        reserved: 3
      },
      {
        id: 110,
        gallery: [
          "https://i.pinimg.com/1200x/1f/30/24/1f3024f71606f351c3886a5fc9e0bf94.jpg",
          "https://i.pinimg.com/1200x/1d/b4/f6/1db4f6a0f34dd153b1ed71622caeda44.jpg",
          "https://i.pinimg.com/1200x/77/27/76/772776f5b6209709a2b989d411965487.jpg"
        ],
        colorId: 2,
        color: "Brown",
        sizeId: 2,
        size: "L",
        quantity: 20,
        reserved: 3
      },
      {
        id: 111,
        gallery: [
          "https://i.pinimg.com/1200x/1f/30/24/1f3024f71606f351c3886a5fc9e0bf94.jpg",
          "https://i.pinimg.com/1200x/1d/b4/f6/1db4f6a0f34dd153b1ed71622caeda44.jpg",
          "https://i.pinimg.com/1200x/77/27/76/772776f5b6209709a2b989d411965487.jpg"
        ],
        colorId: 2,
        color: "Yellow",
        sizeId: 2,
        size: "S",
        quantity: 20,
        reserved: 3
      },
      {
        id: 112,
        gallery: [
          "https://i.pinimg.com/1200x/1f/30/24/1f3024f71606f351c3886a5fc9e0bf94.jpg",
          "https://i.pinimg.com/1200x/1d/b4/f6/1db4f6a0f34dd153b1ed71622caeda44.jpg",
          "https://i.pinimg.com/1200x/77/27/76/772776f5b6209709a2b989d411965487.jpg"
        ],
        colorId: 2,
        color: "Red",
        sizeId: 2,
        size: "XXL",
        quantity: 20,
        reserved: 3
      }
    ]
  },

  {
    id: 2,
    name: "Rock Oversize Tee",
    category: "t-shirt",
    price: 550,
    originalPrice: 720,
    description: "Oversized streetwear t-shirt",
    discount: 18,
    rating: 4.6,
    variants: [
      {
        id: 103,
        gallery: [
          "https://i.pinimg.com/736x/ae/ac/3f/aeac3f2ce9efe6626b89894a7e4c64a1.jpg",
          "https://i.pinimg.com/1200x/b0/7a/db/b07adbae6e1e736b85b9d269dde27a44.jpg",
          "https://i.pinimg.com/1200x/77/27/76/772776f5b6209709a2b989d411965487.jpg"
        ],
        colorId: 3,
        color: "Gray",
        sizeId: 3,
        size: "XL",
        quantity: 15,
        reserved: 2
      },
      {
        id: 104,
        gallery: [
          "https://i.pinimg.com/736x/6e/0c/8b/6e0c8bb58ed5113081244aaefc71cb8c.jpg",
          "https://i.pinimg.com/1200x/c0/00/9d/c0009d73533f89f718555fd67cf9eb64.jpg",
          "https://i.pinimg.com/1200x/ae/cb/bc/aecbbc7a6e712c3975e48328e69c0966.jpg"
        ],
        colorId: 4,
        color: "Beige",
        sizeId: 2,
        size: "L",
        quantity: 18,
        reserved: 4
      }
    ]
  },

  {
    id: 3,
    name: "Rock Graphic Tee",
    category: "t-shirt",
    price: 600,
    originalPrice: 780,
    description: "Printed graphic t-shirt",
    discount: 23,
    rating: 4.7,
    variants: [
      {
        id: 105,
        gallery: [
          "https://i.pinimg.com/1200x/70/5b/3d/705b3d4a0e2c9f5bf11516a9fe19f99c.jpg",
          "https://i.pinimg.com/736x/6e/0c/8b/6e0c8bb58ed5113081244aaefc71cb8c.jpg",
          "https://i.pinimg.com/1200x/ae/cb/bc/aecbbc7a6e712c3975e48328e69c0966.jpg"
        ],
        colorId: 5,
        color: "Brown",
        sizeId: 1,
        size: "M",
        quantity: 22,
        reserved: 6
      },
      {
        id: 106,
        gallery: [
          "https://i.pinimg.com/1200x/1f/30/24/1f3024f71606f351c3886a5fc9e0bf94.jpg",
          "https://i.pinimg.com/1200x/35/62/8d/35628d2991602e228fe10a47c695bb0a.jpg",
          "https://i.pinimg.com/1200x/b1/bb/a6/b1bba659516c57eeacc48dd75bd22f0d.jpg"
        ],
        colorId: 6,
        color: "Off White",
        sizeId: 2,
        size: "L",
        quantity: 19,
        reserved: 5
      }
    ]
  },

  {
    id: 4,
    name: "Rock Sport Tee",
    category: "t-shirt",
    price: 480,
    originalPrice: 620,
    description: "Lightweight sport t-shirt",
    discount: 22,
    rating: 4.4,
    variants: [
      {
        id: 107,
        gallery: [
          "https://i.pinimg.com/1200x/f7/ef/ed/f7efedc3dc01cda73a5425cc4fa7a3ee.jpg",
          "https://i.pinimg.com/1200x/41/87/75/4187759ab720896a09062058d3935e3b.jpg",
          "https://i.pinimg.com/1200x/18/cf/fd/18cffde966d7ab81399d6f3b5f06637e.jpg"
        ],
        colorId: 7,
        color: "Blue",
        sizeId: 2,
        size: "L",
        quantity: 30,
        reserved: 8
      },
      {
        id: 108,
        gallery: [
          "https://i.pinimg.com/1200x/78/fc/73/78fc73292f3e29443b0e9949ea55c48a.jpg",
          "https://i.pinimg.com/1200x/f7/ef/ed/f7efedc3dc01cda73a5425cc4fa7a3ee.jpg",
          "https://i.pinimg.com/736x/a0/e2/ec/a0e2ec9253d8729d1e19c84e812658f1.jpg"
        ],
        colorId: 8,
        color: "Navy",
        sizeId: 1,
        size: "M",
        quantity: 28,
        reserved: 7
      }
    ]
  },

  // ================= COATS =================
  {
    id: 5,
    name: "Rock Winter Coat",
    category: "Coats",
    price: 1800,
    originalPrice: 2300,
    description: "Heavy winter coat",
    discount: 22,
    rating: 4.8,
    variants: [
      {
        id: 201,
        gallery: [
          "https://i.pinimg.com/1200x/a9/24/1c/a9241cd927deec3e8797426c03f541e3.jpg",
          "https://i.pinimg.com/736x/1d/7d/63/1d7d635d6ade968c8e728c80387d2a00.jpg",
          "https://i.pinimg.com/1200x/af/91/56/af9156dbdbb5f1cf4354aa41c68ee718.jpg"
        ],
        colorId: 1,
        color: "Black",
        sizeId: 3,
        size: "XL",
        quantity: 10,
        reserved: 2
      },
      {
        id: 202,
        gallery: [
          "https://i.pinimg.com/1200x/67/9b/bd/679bbd3f6f4f8253298d0f55c182d9fe.jpg",
          "https://i.pinimg.com/736x/7a/3e/d7/7a3ed7395e3dc66858ca2b359b6f4664.jpg",
          "https://i.pinimg.com/736x/1d/7d/63/1d7d635d6ade968c8e728c80387d2a00.jpg"
        ],
        colorId: 9,
        color: "Olive",
        sizeId: 2,
        size: "L",
        quantity: 12,
        reserved: 3
      }
    ]
  },

  {
    id: 6,
    name: "Rock Casual Jacket",
    category: "Coats",
    price: 1500,
    originalPrice: 1900,
    description: "Casual everyday jacket",
    discount: 21,
    rating: 4.6,
    variants: [
      {
        id: 203,
        gallery: [
          "https://i.pinimg.com/736x/2f/d3/d4/2fd3d4c37b157a29425ae338ac4f97eb.jpg",
          "https://i.pinimg.com/1200x/25/be/7d/25be7dd661e3675466d83769b379b387.jpg",
          "https://img.fantaskycdn.com/c6fc12aad4a35a2b6265bc517a300b1d_1024x.jpeg"
        ],
        colorId: 10,
        color: "Gray",
        sizeId: 2,
        size: "L",
        quantity: 16,
        reserved: 4
      },
      {
        id: 204,
        gallery: [
          "https://i.pinimg.com/736x/ae/ac/3f/aeac3f2ce9efe6626b89894a7e4c64a1.jpg",
          "https://i.pinimg.com/1200x/b0/7a/db/b07adbae6e1e736b85b9d269dde27a44.jpg",
          "https://i.pinimg.com/1200x/77/27/76/772776f5b6209709a2b989d411965487.jpg"
        ],
        colorId: 11,
        color: "Beige",
        sizeId: 3,
        size: "XL",
        quantity: 14,
        reserved: 3
      }
    ]
  },

  // ================= PANTS =================
  {
    id: 7,
    name: "Rock Denim Jeans",
    category: "Pants",
    price: 900,
    originalPrice: 1200,
    description: "Classic denim jeans",
    discount: 25,
    rating: 4.6,
    variants: [
      {
        id: 301,
        gallery: [
          "https://i.pinimg.com/736x/6e/0c/8b/6e0c8bb58ed5113081244aaefc71cb8c.jpg",
          "https://i.pinimg.com/1200x/c0/00/9d/c0009d73533f89f718555fd67cf9eb64.jpg",
          "https://i.pinimg.com/1200x/ae/cb/bc/aecbbc7a6e712c3975e48328e69c0966.jpg"
        ],
        colorId: 5,
        color: "Blue",
        sizeId: 32,
        size: "M",
        quantity: 30,
        reserved: 8
      },
      {
        id: 302,
        gallery: [
          "https://i.pinimg.com/1200x/35/62/8d/35628d2991602e228fe10a47c695bb0a.jpg",
          "https://i.pinimg.com/1200x/b1/bb/a6/b1bba659516c57eeacc48dd75bd22f0d.jpg",
          "https://i.pinimg.com/1200x/f7/ef/ed/f7efedc3dc01cda73a5425cc4fa7a3ee.jpg"
        ],
        colorId: 12,
        color: "Black",
        sizeId: 34,
        size: "L",
        quantity: 26,
        reserved: 6
      }
    ]
  },

  {
    id: 8,
    name: "Rock Minimal Tee",
    category: "t-shirt",
    price: 520,
    originalPrice: 680,
    description: "Minimal design cotton t-shirt",
    discount: 24,
    rating: 4.3,
    variants: [
      {
        id: 401,
        gallery: [
          "https://i.pinimg.com/736x/1d/7d/63/1d7d635d6ade968c8e728c80387d2a00.jpg",
          "https://i.pinimg.com/1200x/af/91/56/af9156dbdbb5f1cf4354aa41c68ee718.jpg",
          "https://i.pinimg.com/1200x/67/9b/bd/679bbd3f6f4f8253298d0f55c182d9fe.jpg"
        ],
        colorId: 1,
        color: "Black",
        sizeId: 1,
        size: "M",
        quantity: 24,
        reserved: 5
      },
      {
        id: 402,
        gallery: [
          "https://i.pinimg.com/736x/7a/3e/d7/7a3ed7395e3dc66858ca2b359b6f4664.jpg",
          "https://i.pinimg.com/1200x/1f/30/24/1f3024f71606f351c3886a5fc9e0bf94.jpg",
          "https://i.pinimg.com/1200x/35/62/8d/35628d2991602e228fe10a47c695bb0a.jpg"
        ],
        colorId: 2,
        color: "Beige",
        sizeId: 2,
        size: "L",
        quantity: 20,
        reserved: 4
      }
    ]
  },

  // ================= MORE COATS =================
  {
    id: 9,
    name: "Rock Long Coat",
    category: "Coats",
    price: 2100,
    originalPrice: 2600,
    description: "Elegant long winter coat",
    discount: 19,
    rating: 4.9,
    variants: [
      {
        id: 403,
        gallery: [
          "https://i.pinimg.com/1200x/a9/24/1c/a9241cd927deec3e8797426c03f541e3.jpg",
          "https://i.pinimg.com/736x/ae/ac/3f/aeac3f2ce9efe6626b89894a7e4c64a1.jpg",
          "https://i.pinimg.com/1200x/b0/7a/db/b07adbae6e1e736b85b9d269dde27a44.jpg"
        ],
        colorId: 3,
        color: "Dark Gray",
        sizeId: 3,
        size: "XL",
        quantity: 11,
        reserved: 2
      },
      {
        id: 404,
        gallery: [
          "https://i.pinimg.com/1200x/25/be/7d/25be7dd661e3675466d83769b379b387.jpg",
          "https://i.pinimg.com/736x/2f/d3/d4/2fd3d4c37b157a29425ae338ac4f97eb.jpg",
          "https://img.fantaskycdn.com/c6fc12aad4a35a2b6265bc517a300b1d_1024x.jpeg"
        ],
        colorId: 4,
        color: "Camel",
        sizeId: 2,
        size: "L",
        quantity: 9,
        reserved: 1
      }
    ]
  },

  // ================= MORE PANTS =================
  {
    id: 10,
    name: "Rock Relaxed Pants",
    category: "Pants",
    price: 880,
    originalPrice: 1150,
    description: "Relaxed fit everyday pants",
    discount: 23,
    rating: 4.5,
    variants: [
      {
        id: 405,
        gallery: [
          "https://i.pinimg.com/1200x/18/cf/fd/18cffde966d7ab81399d6f3b5f06637e.jpg",
          "https://i.pinimg.com/736x/a0/e2/ec/a0e2ec9253d8729d1e19c84e812658f1.jpg",
          "https://i.pinimg.com/1200x/78/fc/73/78fc73292f3e29443b0e9949ea55c48a.jpg"
        ],
        colorId: 5,
        color: "Gray",
        sizeId: 32,
        size: "L",
        quantity: 27,
        reserved: 6
      },
      {
        id: 406,
        gallery: [
          "https://i.pinimg.com/1200x/f7/ef/ed/f7efedc3dc01cda73a5425cc4fa7a3ee.jpg",
          "https://i.pinimg.com/1200x/41/87/75/4187759ab720896a09062058d3935e3b.jpg",
          "https://i.pinimg.com/1200x/ae/cb/bc/aecbbc7a6e712c3975e48328e69c0966.jpg"
        ],
        colorId: 6,
        color: "Navy",
        sizeId: 34,
        size: "S",
        quantity: 22,
        reserved: 5
      }
    ]
  },

  {
    id: 11,
    name: "Rock Street Cargo",
    category: "Pants",
    price: 980,
    originalPrice: 1300,
    description: "Street-style cargo pants",
    discount: 25,
    rating: 4.7,
    variants: [
      {
        id: 407,
        gallery: [
          "https://i.pinimg.com/736x/7a/3e/d7/7a3ed7395e3dc66858ca2b359b6f4664.jpg",
          "https://i.pinimg.com/1200x/67/9b/bd/679bbd3f6f4f8253298d0f55c182d9fe.jpg",
          "https://i.pinimg.com/736x/1d/7d/63/1d7d635d6ade968c8e728c80387d2a00.jpg"
        ],
        colorId: 7,
        color: "Olive",
        sizeId: 32,
        size: "XL",
        quantity: 19,
        reserved: 4
      },
      {
        id: 408,
        gallery: [
          "https://i.pinimg.com/1200x/35/62/8d/35628d2991602e228fe10a47c695bb0a.jpg",
          "https://i.pinimg.com/1200x/b1/bb/a6/b1bba659516c57eeacc48dd75bd22f0d.jpg",
          "https://i.pinimg.com/1200x/1f/30/24/1f3024f71606f351c3886a5fc9e0bf94.jpg"
        ],
        colorId: 8,
        color: "Black",
        sizeId: 34,
        size: "X",
        quantity: 21,
        reserved: 6
      }
    ]
  }
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
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar></Navbar>

      <div className="product-page container">
        <div className="page-content">
          {/* Sidebar */}
          <aside className="filter-sidebar">
            <div className="filter-section" style={{ marginBottom: '1rem' }}>
              <h3>Filter</h3>
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

            {/* Apply & Reset */}
            <div className="filter-sidebar-footer">
              <button className="btn-clear">Reset</button>
              <button className="btn-apply">Apply</button>
            </div>
          </aside>

          <div className="mobile-filter-container">
            <button
              className="moblie-filter-button"
              onClick={toggleSidebar}
              aria-label={isOpen && window.innerWidth <= 768 ? "Close filters" : "Open filters"}>
              Filter <i className="fa-solid fa-filter" style={{ marginLeft: '.25rem' }}></i>
            </button>

            <div className={`moblie-sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={toggleSidebar} />

            <aside className={`moblie-filter-sidebar ${isOpen ? 'open' : ''}`}>
              <p className='filter-sidebar-title'>Filter</p>
              <div className="sidebar-content">
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
              </div>

              {/* Apply & Reset */}
              <div className="filter-sidebar-footer">
                <button className="btn-clear">Reset</button>
                <button className="btn-apply">Apply</button>
              </div>
            </aside>
          </div>

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