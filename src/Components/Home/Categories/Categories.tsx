// import React, { useState, useRef, useEffect } from 'react';
// import Hodies from '../../../assets/hodies.png';
// import Pants from '../../../assets/pants.jpg';
// import Shirt from '../../../assets/t-shirts2.jpg';
// import Shirt2 from '../../../assets/t-shirt.jpg';
// import "./Categories.css";


// export default function Categories() {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const categories = [
//         { id: 1, name: 'Shirts', image: Shirt, description: 'Classic & Modern Styles' },
//         { id: 3, name: 'Jackets', image: Shirt2, description: 'Warm & Fashionable' },
//         { id: 2, name: 'Pants', image: Pants, description: 'Comfortable & Stylish' },
//         { id: 4, name: 'Dresses', image: Shirt2, description: 'Elegant & Versatile' },
//     ];

//     const itemsPerPage = 3;
//     const maxIndex = Math.ceil(categories.length / itemsPerPage) - 1;

//     const goToPrevious = () => {
//         setCurrentIndex(prev => (prev > 0 ? prev - 1 : maxIndex));
//     };

//     const goToNext = () => {
//         setCurrentIndex(prev => (prev < maxIndex ? prev + 1 : 0));
//     };

//     const goToIndex = (index) => {
//         setCurrentIndex(index);
//     };

//     // Calculate visible categories based on current index
//     const startIndex = currentIndex * itemsPerPage;
//     const visibleCategories = categories.slice(startIndex, startIndex + itemsPerPage);

//     return (
//         <section className="container categories-section">
//             <div className="slider-container">
//                 {/* Title positioned next to cards */}
//                 <h2 className="slider-title">Shop By <span>Category</span></h2>

//                 <div className="categories-wrapper">
//                     <div className="navigation-controls">
//                         <button
//                             className="nav-button left-arrow"
//                             onClick={goToPrevious}
//                             aria-label="Previous category"
//                         >
//                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                                 <path d="M15 18l-6-6 6-6" />
//                             </svg>
//                         </button>

//                         <div className="categories-container">
//                             {visibleCategories.map((category) => (
//                                 <div key={category.id} className="category-card">
//                                     <div className="category-image-wrapper">
//                                         <img
//                                             src={category.image}
//                                             alt={category.name}
//                                             className="category-image"
//                                         />
//                                         <div className="category-info">
//                                             <h3>{category.name}</h3>
//                                             <p className="category-description">{category.description}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         <button
//                             className="nav-button right-arrow"
//                             onClick={goToNext}
//                             aria-label="Next category"
//                         >
//                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                                 <path d="M9 6l6 6-6 6" />
//                             </svg>
//                         </button>
//                     </div>

//                     {/* Rectangular pagination indicators instead of dots */}
//                     <div className="pagination-rectangles">
//                         {[...Array(maxIndex + 1)].map((_, index) => (
//                             <button
//                                 key={index}
//                                 className={`rectangle ${index === currentIndex ? 'active' : ''}`}
//                                 onClick={() => goToIndex(index)}
//                                 aria-label={`Go to page ${index + 1}`}
//                             />
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }
