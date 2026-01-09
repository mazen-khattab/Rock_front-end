// import React, { useEffect, useState } from 'react';
// import type { Product } from '../../../Types/product';
// import './ProductDetails.css';
// import { useCart } from '../../../Context/CartContext';
// import { useParams } from 'react-router-dom';

// // interface ProductPopupProps {
// //     product: Product
// // }

// const ProductPopup = () => {
//     const { id } = useParams<{ id: string }>();

//     // states and variables.
//     const { addToCart } = useCart();
//     const allSizes = [...new Set(product.variants.map(v => v.size))]
//     const [mainImage, setMainImage] = useState(product.variants[0].gallery[0]);
//     const [gallery, setGallery] = useState(product.variants[0].gallery);
//     const [isAdding, setIsAdding] = useState(false);
//     const [selectedColor, setSelectedColor] = useState<string>(product.variants[0].color);
//     const [selectedSize, setSelectedSize] = useState<string>(product.variants[0].size);
//     const [colorError, setColorError] = useState(false);
//     const [sizeError, setSizeError] = useState(false);
//     const [uniqueColors, setUniqueColors] = useState([...new Set(product.variants.filter(v => v.size === allSizes[0]).map(v => v.color))]);

//     useEffect(() => {
//         const fetchProduct = () => {
//             try {
//                 const productsStr = localStorage.getItem('products');
//                 if (!productsStr) {
//                     console.error('No products found in localStorage');
//                     return;
//                 }

//                 const products: Product[] = JSON.parse(productsStr);
//                 const foundProduct = products.find(p => p.id === id);

//                 if (foundProduct) {
//                     setSelectedSize(foundProduct.sizes[0] || '');
//                     setSelectedColor(foundProduct.colors[0] || '');
//                 } else {
//                     console.error(`Product with id ${id} not found`);
//                 }
//             } catch (error) {
//                 console.error('Error fetching product:', error);
//             }
//         };

//         if (id) {
//             fetchProduct();
//         }
//     }, [id]);

//     // Get related products (excluding current product)
//     const getRelatedProducts = () => {
//         try {
//             const productsStr = localStorage.getItem('products');
//             if (!productsStr) return [];
//             const allProducts: Product[] = JSON.parse(productsStr);
//             return allProducts.filter(p => p.id !== product.id).slice(0, 3);
//         } catch (error) {
//             console.error('Error fetching related products:', error);
//             return [];
//         }
//     };

//     const relatedProducts = getRelatedProducts();

//     const handleAddToCart = () => {
//         if (isAdding) return;
//         setIsAdding(true);

//         if (!selectedColor || !selectedSize) {
//             if (!selectedColor) {
//                 setColorError(true)
//             }

//             if (!selectedSize) {
//                 setSizeError(true)
//             }
//         } else {
//             const variant = getVariant(selectedColor, selectedSize);

//             const cartItem = {
//                 productId: product.id,
//                 variantId: variant?.id,
//                 name: product.name,
//                 price: product.price,
//                 description: product.description,
//                 gallery: variant?.gallery,
//                 colorId: variant?.colorId,
//                 color: variant?.color,
//                 sizeId: variant?.sizeId,
//                 size: variant?.size,
//                 reserved: variant?.reserved,
//                 quantity: 1,
//             }

//             addToCart(cartItem);
//         }

//         setTimeout(() => {
//             setIsAdding(false);
//             setColorError(false)
//             setSizeError(false)
//         }, 1000);
//     };

//     const handleSelectedSize = (size: string) => {
//         setSelectedSize(size);

//         // get all variants these are match the selected size.
//         const availableVariants = product.variants.filter(v => v.size === size)
//         setUniqueColors([...new Set(availableVariants.map(v => v.color))]);

//         // change the color to be the selected color
//         setSelectedColor(availableVariants[0].color);
//         // change the main image to be the first image in the selected variant gallery
//         setMainImage(availableVariants[0].gallery[0])
//         // change the gallery to the gallery of the selected variant
//         setGallery(availableVariants[0].gallery)
//     }

//     const handleSelectedColor = (color: string) => {
//         // get a single variant by the color
//         const variant = getVariantByColor(color);

//         // change the color to be the selected color
//         setSelectedColor(color);
//         // change the main image to be the first image in the selected variant gallery
//         setMainImage(variant.gallery[0])

//         // change the gallery to the gallery of the selected variant
//         setGallery(variant.gallery)
//     }

//     // used to get the seleted variant to add it in the cart.
//     const getVariant = (color: string, size: string) => {
//         const selectedVariant = product.variants.filter(v => v.color === color && v.size === size)

//         return selectedVariant[0];
//     }

//     // used to return the first variant that match the given color
//     const getVariantByColor = (color: string) => {
//         return product.variants.filter(v => v.color === color)[0];
//     }

//     return (
//         <div className="product-popup-overlay">
//             <div className="product-popup" onClick={(e) => e.stopPropagation()}>
//                 <button className="close-btn">
//                     <i className="fas fa-times"></i>
//                 </button>

//                 <div className="product-popup-content">
//                     <div className="product-images-section">
//                         <img src={mainImage} alt={product.name} className="main-product-image" />

//                         {/* Additional images could be added here */}
//                         <div className="additional-images">
//                             {gallery.map((Image, index) => (
//                                 <img
//                                     src={Image}
//                                     key={Image + index}
//                                     onClick={() => setMainImage(Image)}
//                                     alt="Product view 1"
//                                     className={mainImage === Image ? "thumbnail selected" : "thumbnail"}
//                                 />
//                             ))}
//                         </div>
//                     </div>

//                     <div className="product-details-section">
//                         <div className="product-badge">PREMIUM QUALITY</div>
//                         <h1 className="product-title">{product.name}</h1>

//                         <p className="product-description">
//                             {product.description || "Prepare to embrace the cold in style and warmth with our Premium Quality Down Jacket. Crafted with the utmost attention to detail and featuring the finest materials, this jacket is designed to keep you cozy in even the harshest winter conditions."}
//                         </p>

//                         <div className="product-price">${product.price}</div>

//                         <div className={sizeError ? "size-selector display-color-error" : "size-selector"}>
//                             <label>Select size</label>
//                             <div className="size-options">
//                                 {allSizes.map(size => (
//                                     <button
//                                         key={size}
//                                         className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
//                                         onClick={() => handleSelectedSize(size)}
//                                     >
//                                         {size}
//                                     </button>
//                                 ))}
//                                 <button className="size-guide">Size Guide</button>
//                             </div>
//                             <p className='size-error' style={sizeError ? { opacity: "1" } : { opacity: '0' }}>Select a size firts.</p>
//                         </div>
//                         {/* | {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)} */}
//                         <div className={colorError ? "color-selector display-color-error" : "color-selector"}>
//                             <label>Color{selectedColor ? " | " + selectedColor : ""}</label>
//                             <div className="color-options">
//                                 {uniqueColors.map(color => (
//                                     <button
//                                         key={color}
//                                         className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
//                                         style={{ backgroundColor: color }}
//                                         onClick={() => handleSelectedColor(color)}
//                                     ></button>
//                                 ))}
//                             </div>
//                             <p className='color-error' style={colorError ? { opacity: "1" } : { opacity: '0' }}>Select a color first.</p>
//                         </div>

//                         <button className="add-to-cart-btn" onClick={() => handleAddToCart()}>
//                             <i className="fas fa-shopping-cart"></i> Add to cart
//                         </button>

//                         <div className="delivery-info">
//                             <i className="fas fa-truck"></i> Free delivery on orders over $30.00
//                         </div>

//                         <div className="features-section">
//                             <h3>KEY FEATURES</h3>
//                             <ul>
//                                 <li><i className="fas fa-check"></i> High stand-up collar</li>
//                                 <li><i className="fas fa-check"></i> Metal zipper and hidden button fastening</li>
//                                 <li><i className="fas fa-check"></i> Two slit pockets with buttons</li>
//                                 <li><i className="fas fa-check"></i> Long sleeves with hidden elastic cuffs</li>
//                                 <li><i className="fas fa-check"></i> Lining inside</li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductPopup;