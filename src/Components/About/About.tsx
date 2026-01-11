import { Heart, Leaf, Users, Award } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Navbar from '../Home/Navbar/Navbar';
import './About.css'

const About = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('About');
    
    return (
        <div>
            <Navbar></Navbar>

            {/* Header */}
            <header className="about-header">
                <div className="about-header-container">
                    <h1 className="about-header-title">{t('our_story')}</h1>
                    <p className="about-header-subtitle">
                        {t('crafting_timeless_fashion')}
                    </p>
                </div>
            </header>

            {/* Our Beginning */}
            <section className="about-section">
                <div className="about-section-container">
                    <div className="about-grid-2">
                        <div className="about-text-content">
                            <h2 className="about-section-title">{t('our_beginning')}</h2>
                            <p className="about-section-paragraph">
                                {t('beginning_paragraph_1')}
                            </p>
                            <p className="about-section-paragraph">
                                {t('beginning_paragraph_2')}
                            </p>
                            <p className="about-section-paragraph">
                                {t('beginning_paragraph_3')}
                            </p>
                        </div>
                        <div className="about-image-placeholder">Image Placeholder</div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="about-section-light">
                <div className="about-section-container">
                    <h2 className="about-section-title">{t('our_values')}</h2>
                    <div className="about-grid-4">
                        <div className="about-card">
                            <div className="about-card-icon">
                                <Leaf className="about-card-icon-svg" />
                            </div>
                            <h3 className="about-card-title">{t('sustainability')}</h3>
                            <p className="about-card-text">
                                {t('sustainability_text')}
                            </p>
                        </div>

                        <div className="about-card">
                            <div className="about-card-icon">
                                <Heart className="about-card-icon-svg" />
                            </div>
                            <h3 className="about-card-title">{t('ethics')}</h3>
                            <p className="about-card-text">
                                {t('ethics_text')}
                            </p>
                        </div>

                        <div className="about-card">
                            <div className="about-card-icon">
                                <Award className="about-card-icon-svg" />
                            </div>
                            <h3 className="about-card-title">{t('quality')}</h3>
                            <p className="about-card-text">
                                {t('quality_text')}
                            </p>
                        </div>

                        <div className="about-card">
                            <div className="about-card-icon">
                                <Users className="about-card-icon-svg" />
                            </div>
                            <h3 className="about-card-title">{t('community')}</h3>
                            <p className="about-card-text">
                                {t('community_text')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Mission */}
            <section className="about-section">
                <div className="about-section-container">
                    <div className="about-section-heading">
                        <h2 className="about-section-heading-title">{t('our_mission')}</h2>
                        <p className="about-section-heading-text">
                            {t('mission_text')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Join Our Journey */}
            <section className="about-section">
                <div className="about-section-container">
                    <div className="about-section-heading">
                        <h2 className="about-section-heading-title">{t('join_our_journey')}</h2>
                        <p className="about-section-heading-text">
                            {t('journey_text')}
                        </p>
                    </div>
                    <div className="about-btn-group">
                        <button className="about-btn-primary" onClick={() => navigate("/products")}>{t('shop_now')}</button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;