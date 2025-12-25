import { Heart, Leaf, Users, Award } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import Navbar from '../Home/Navbar/Navbar';
import './About.css'

const About = () => {
    const navigate = useNavigate();
    
    return (
        <div>
            <Navbar></Navbar>

            {/* Header */}
            <header className="about-header">
                <div className="about-header-container">
                    <h1 className="about-header-title">Our Story</h1>
                    <p className="about-header-subtitle">
                        Crafting timeless fashion with purpose and passion since 2015
                    </p>
                </div>
            </header>

            {/* Our Beginning */}
            <section className="about-section">
                <div className="about-section-container">
                    <div className="about-grid-2">
                        <div className="about-text-content">
                            <h2 className="about-section-title">Our Beginning</h2>
                            <p className="about-section-paragraph">
                                We started with a simple idea: create beautiful, quality clothing that reflects
                                your personal style without compromising on craftsmanship.
                            </p>
                            <p className="about-section-paragraph">
                                Every piece in our collection is carefully designed and selected to ensure you
                                get the best value. We believe in providing stylish options that are accessible
                                and built to last.
                            </p>
                            <p className="about-section-paragraph">
                                We're growing steadily, and with each new customer, we're building a community
                                of people who appreciate quality fashion and thoughtful design.
                            </p>
                        </div>
                        <div className="about-image-placeholder">Image Placeholder</div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="about-section-light">
                <div className="about-section-container">
                    <h2 className="about-section-title">Our Values</h2>
                    <div className="about-grid-4">
                        <div className="about-card">
                            <div className="about-card-icon">
                                <Leaf className="about-card-icon-svg" />
                            </div>
                            <h3 className="about-card-title">Sustainability</h3>
                            <p className="about-card-text">
                                We source eco-friendly materials and implement green practices in every step of production.
                            </p>
                        </div>

                        <div className="about-card">
                            <div className="about-card-icon">
                                <Heart className="about-card-icon-svg" />
                            </div>
                            <h3 className="about-card-title">Ethics</h3>
                            <p className="about-card-text">
                                Fair wages, safe conditions, and respect for every person in our supply chain.
                            </p>
                        </div>

                        <div className="about-card">
                            <div className="about-card-icon">
                                <Award className="about-card-icon-svg" />
                            </div>
                            <h3 className="about-card-title">Quality</h3>
                            <p className="about-card-text">
                                Timeless designs crafted to last, reducing waste and celebrating lasting style.
                            </p>
                        </div>

                        <div className="about-card">
                            <div className="about-card-icon">
                                <Users className="about-card-icon-svg" />
                            </div>
                            <h3 className="about-card-title">Community</h3>
                            <p className="about-card-text">
                                Building a movement of conscious consumers who believe fashion can change the world.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Mission */}
            <section className="about-section">
                <div className="about-section-container">
                    <div className="about-section-heading">
                        <h2 className="about-section-heading-title">Our Mission</h2>
                        <p className="about-section-heading-text">
                            To create beautiful, sustainable clothing that empowers individuals to express
                            themselves while making a positive impact on the planet. We believe fashion should
                            be a force for good, and every piece we create is a step toward that vision.
                        </p>
                    </div>
                </div>
            </section>

            {/* Join Our Journey */}
            <section className="about-section">
                <div className="about-section-container">
                    <div className="about-section-heading">
                        <h2 className="about-section-heading-title">Join Our Journey</h2>
                        <p className="about-section-heading-text">
                            Be part of a community that values style, sustainability, and social responsibility.
                            Together, we're redefining what fashion means for the future.
                        </p>
                    </div>
                    <div className="about-btn-group">
                        <button className="about-btn-primary" onClick={() => navigate("/products")}>Shop Now</button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;