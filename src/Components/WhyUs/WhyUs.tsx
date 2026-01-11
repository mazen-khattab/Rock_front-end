import { CheckCircle, Zap, Gem, TrendingUp } from 'lucide-react';
import Navbar from '../Home/Navbar/Navbar';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import './WhyUs.css';

const WhyUs = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('WhyUs');
    
    return (
        <div>
            <Navbar></Navbar>

            {/* Header */}
            <header className="whyus-header">
                <div className="whyus-header-container">
                    <h1 className="whyus-header-title">{t('why_choose_us')}</h1>
                    <p className="whyus-header-subtitle">{t('discover_makes_clothing')}</p>
                </div>
            </header>

            {/* The Difference We Make */}
            <section className="whyus-section">
                <div className="whyus-section-container">
                    <div className="whyus-section-heading">
                        <h2 className="whyus-section-heading-title">{t('the_difference_we_make')}</h2>
                        <p className="whyus-section-heading-text">
                            {t('difference_description')}
                        </p>
                    </div>
                    <ul className="whyus-feature-list">
                        <li className="whyus-feature-item">
                            <CheckCircle className="whyus-feature-icon" />
                            <div className="whyus-feature-content">
                                <h4 className="whyus-feature-title">{t('premium_quality_materials')}</h4>
                                <p className="whyus-feature-description">{t('premium_quality_description')}</p>
                            </div>
                        </li>
                        <li className="whyus-feature-item">
                            <CheckCircle className="whyus-feature-icon" />
                            <div className="whyus-feature-content">
                                <h4 className="whyus-feature-title">{t('thoughtful_design')}</h4>
                                <p className="whyus-feature-description">{t('thoughtful_design_description')}</p>
                            </div>
                        </li>
                        <li className="whyus-feature-item">
                            <CheckCircle className="whyus-feature-icon" />
                            <div className="whyus-feature-content">
                                <h4 className="whyus-feature-title">{t('fair_pricing')}</h4>
                                <p className="whyus-feature-description">{t('fair_pricing_description')}</p>
                            </div>
                        </li>
                        <li className="whyus-feature-item">
                            <CheckCircle className="whyus-feature-icon" />
                            <div className="whyus-feature-content">
                                <h4 className="whyus-feature-title">{t('sustainable_practices')}</h4>
                                <p className="whyus-feature-description">{t('sustainable_practices_description')}</p>
                            </div>
                        </li>
                        <li className="whyus-feature-item">
                            <CheckCircle className="whyus-feature-icon" />
                            <div className="whyus-feature-content">
                                <h4 className="whyus-feature-title">{t('customer_support')}</h4>
                                <p className="whyus-feature-description">{t('customer_support_description')}</p>
                            </div>
                        </li>
                        <li className="whyus-feature-item">
                            <CheckCircle className="whyus-feature-icon" />
                            <div className="whyus-feature-content">
                                <h4 className="whyus-feature-title">{t('continuous_improvement')}</h4>
                                <p className="whyus-feature-description">{t('continuous_improvement_description')}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Our Advantages */}
            <section className="whyus-section-light">
                <div className="whyus-section-container">
                    <h2 className="whyus-section-title">{t('our_advantages')}</h2>
                    <div className="whyus-grid-3">
                        <div className="whyus-card">
                            <div className="whyus-card-icon">
                                <Gem className="whyus-card-icon-svg" />
                            </div>
                            <h3 className="whyus-card-title">{t('curated_selection')}</h3>
                            <p className="whyus-card-text">
                                {t('curated_selection_description')}
                            </p>
                        </div>

                        <div className="whyus-card">
                            <div className="whyus-card-icon">
                                <Zap className="whyus-card-icon-svg" />
                            </div>
                            <h3 className="whyus-card-title">{t('fast_shipping')}</h3>
                            <p className="whyus-card-text">
                                {t('fast_shipping_description')}
                            </p>
                        </div>

                        <div className="whyus-card">
                            <div className="whyus-card-icon">
                                <TrendingUp className="whyus-card-icon-svg" />
                            </div>
                            <h3 className="whyus-card-title">{t('growing_community')}</h3>
                            <p className="whyus-card-text">
                                {t('growing_community_description')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="whyus-section">
                <div className="whyus-section-container">
                    <div className="whyus-section-heading">
                        <h2 className="whyus-section-heading-title">{t('what_our_customers_say')}</h2>
                        <p className="whyus-section-heading-text">
                            {t('customers_say_description')}
                        </p>
                    </div>
                    <div className="whyus-grid-3">
                        <div className="whyus-testimonial">
                            <p className="whyus-testimonial-text">
                                {t('testimonial_1')}
                            </p>
                            <div className="whyus-testimonial-author">{t('testimonial_author_1')}</div>
                        </div>

                        <div className="whyus-testimonial">
                            <p className="whyus-testimonial-text">
                                {t('testimonial_2')}
                            </p>
                            <div className="whyus-testimonial-author">{t('testimonial_author_2')}</div>
                        </div>

                        <div className="whyus-testimonial">
                            <p className="whyus-testimonial-text">
                                {t('testimonial_3')}
                            </p>
                            <div className="whyus-testimonial-author">{t('testimonial_author_3')}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="whyus-section-dark">
                <div className="whyus-section-container">
                    <div className="whyus-section-heading">
                        <h2 className="whyus-section-heading-title">{t('ready_upgrade_wardrobe')}</h2>
                        <p className="whyus-section-heading-text">
                            {t('upgrade_description')}
                        </p>
                    </div>
                    <div className="whyus-cta-button-wrapper">
                        <button className="whyus-cta-button" onClick={() => navigate("/products")}>{t('start_shopping')}</button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default WhyUs;