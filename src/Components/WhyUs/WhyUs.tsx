import { CheckCircle, Zap, Gem, TrendingUp } from 'lucide-react';
import Navbar from '../Home/Navbar/Navbar';
import { useNavigate } from "react-router-dom";
import './WhyUs.css';

const WhyUs = () => {
    const navigate = useNavigate();
    
    return (
        <div>
            <Navbar></Navbar>

            {/* Header */}
            <header className="whyus-header">
                <div className="whyus-header-container">
                    <h1 className="whyus-header-title">Why Choose Us</h1>
                    <p className="whyus-header-subtitle">Discover what makes our clothing the smart choice for your wardrobe</p>
                </div>
            </header>

            {/* The Difference We Make */}
            <section className="whyus-section">
                <div className="whyus-section-container">
                    <div className="whyus-section-heading">
                        <h2 className="whyus-section-heading-title">The Difference We Make</h2>
                        <p className="whyus-section-heading-text">
                            In a crowded market, we stand out by staying true to our values and delivering
                            exceptional quality that our customers can trust.
                        </p>
                    </div>
                    <ul className="whyus-feature-list">
                        <li className="whyus-feature-item">
                            <CheckCircle className="whyus-feature-icon" />
                            <div className="whyus-feature-content">
                                <h4 className="whyus-feature-title">Premium Quality Materials</h4>
                                <p className="whyus-feature-description">Each piece is crafted from the finest fabrics selected for durability and comfort, ensuring your clothes look great and last longer.</p>
                            </div>
                        </li>
                        <li className="whyus-feature-item">
                            <CheckCircle className="whyus-feature-icon" />
                            <div className="whyus-feature-content">
                                <h4 className="whyus-feature-title">Thoughtful Design</h4>
                                <p className="whyus-feature-description">Our designs are timeless, not trendy. We focus on pieces that work with your existing wardrobe and never go out of style.</p>
                            </div>
                        </li>
                        <li className="whyus-feature-item">
                            <CheckCircle className="whyus-feature-icon" />
                            <div className="whyus-feature-content">
                                <h4 className="whyus-feature-title">Fair Pricing</h4>
                                <p className="whyus-feature-description">We believe quality shouldn't be expensive. Our direct production approach lets us offer exceptional value without compromising on craftsmanship.</p>
                            </div>
                        </li>
                        <li className="whyus-feature-item">
                            <CheckCircle className="whyus-feature-icon" />
                            <div className="whyus-feature-content">
                                <h4 className="whyus-feature-title">Sustainable Practices</h4>
                                <p className="whyus-feature-description">We're committed to reducing our environmental impact through eco-friendly materials and responsible manufacturing processes.</p>
                            </div>
                        </li>
                        <li className="whyus-feature-item">
                            <CheckCircle className="whyus-feature-icon" />
                            <div className="whyus-feature-content">
                                <h4 className="whyus-feature-title">Customer Support</h4>
                                <p className="whyus-feature-description">We stand behind every product with responsive customer service and a hassle-free return policy.</p>
                            </div>
                        </li>
                        <li className="whyus-feature-item">
                            <CheckCircle className="whyus-feature-icon" />
                            <div className="whyus-feature-content">
                                <h4 className="whyus-feature-title">Continuous Improvement</h4>
                                <p className="whyus-feature-description">We listen to our customers and constantly refine our collection based on your feedback and needs.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Our Advantages */}
            <section className="whyus-section-light">
                <div className="whyus-section-container">
                    <h2 className="whyus-section-title">Our Advantages</h2>
                    <div className="whyus-grid-3">
                        <div className="whyus-card">
                            <div className="whyus-card-icon">
                                <Gem className="whyus-card-icon-svg" />
                            </div>
                            <h3 className="whyus-card-title">Curated Selection</h3>
                            <p className="whyus-card-text">
                                Every item is carefully selected and tested to ensure it meets our high standards for quality and design before reaching you.
                            </p>
                        </div>

                        <div className="whyus-card">
                            <div className="whyus-card-icon">
                                <Zap className="whyus-card-icon-svg" />
                            </div>
                            <h3 className="whyus-card-title">Fast Shipping</h3>
                            <p className="whyus-card-text">
                                Quick processing and reliable shipping means your order arrives when you need it, without the waiting game.
                            </p>
                        </div>

                        <div className="whyus-card">
                            <div className="whyus-card-icon">
                                <TrendingUp className="whyus-card-icon-svg" />
                            </div>
                            <h3 className="whyus-card-title">Growing Community</h3>
                            <p className="whyus-card-text">
                                Join a community of like-minded people who appreciate quality, sustainability, and smart fashion choices.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="whyus-section">
                <div className="whyus-section-container">
                    <div className="whyus-section-heading">
                        <h2 className="whyus-section-heading-title">What Our Customers Say</h2>
                        <p className="whyus-section-heading-text">
                            Don't just take our word for it. See why customers choose us for their fashion needs.
                        </p>
                    </div>
                    <div className="whyus-grid-3">
                        <div className="whyus-testimonial">
                            <p className="whyus-testimonial-text">
                                "The quality is exceptional for the price. I've had these pieces for a year and they look brand new. Highly recommend!"
                            </p>
                            <div className="whyus-testimonial-author">Sarah M.</div>
                        </div>

                        <div className="whyus-testimonial">
                            <p className="whyus-testimonial-text">
                                "I love how versatile the designs are. These clothes mix and match perfectly with everything in my wardrobe."
                            </p>
                            <div className="whyus-testimonial-author">Jessica K.</div>
                        </div>

                        <div className="whyus-testimonial">
                            <p className="whyus-testimonial-text">
                                "Finally found a brand that takes sustainability seriously without breaking the bank. This is my new go-to for ethical fashion."
                            </p>
                            <div className="whyus-testimonial-author">Emma R.</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="whyus-section-dark">
                <div className="whyus-section-container">
                    <div className="whyus-section-heading">
                        <h2 className="whyus-section-heading-title">Ready to Upgrade Your Wardrobe?</h2>
                        <p className="whyus-section-heading-text">
                            Experience the difference quality and thoughtful design can make. Shop our collection today and join our growing community of satisfied customers.
                        </p>
                    </div>
                    <div className="whyus-cta-button-wrapper">
                        <button className="whyus-cta-button" onClick={() => navigate("/products")}>Start Shopping</button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default WhyUs;