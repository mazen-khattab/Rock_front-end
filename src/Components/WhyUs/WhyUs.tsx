import { CheckCircle2, Zap, Gem, TrendingUp, Star } from 'lucide-react';
import Navbar from '../Home/Navbar/Navbar';
import Footer from '../Home/Footer/Footer';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import './WhyUs.css';

const WhyUs = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('WhyUs');

  return (
    <div>
      <Navbar />

      <main className="whyus-page container">
        {/* Header Hero Card */}
        <header className="whyus-header-card">
          <div className="whyus-badge">
            <span className="badge-dot"></span>
            <span>KEEF ADVANTAGE</span>
          </div>
          <h1 className="whyus-header-title">{t('why_choose_us')}</h1>
          <p className="whyus-header-subtitle">{t('discover_makes_clothing')}</p>
        </header>

        {/* The Difference We Make */}
        <section className="whyus-card-section">
          <div className="whyus-section-heading">
            <span className="whyus-sub-tag">THE KEEF STANDARD</span>
            <h2 className="whyus-section-title">{t('the_difference_we_make')}</h2>
            <p className="whyus-section-heading-text">
              {t('difference_description')}
            </p>
          </div>
          <div className="whyus-features-grid">
            <div className="whyus-feature-card">
              <div className="whyus-feature-icon-wrap">
                <CheckCircle2 className="whyus-feature-icon" />
              </div>
              <div className="whyus-feature-content">
                <h4 className="whyus-feature-title">{t('premium_quality_materials')}</h4>
                <p className="whyus-feature-description">{t('premium_quality_description')}</p>
              </div>
            </div>

            <div className="whyus-feature-card">
              <div className="whyus-feature-icon-wrap">
                <CheckCircle2 className="whyus-feature-icon" />
              </div>
              <div className="whyus-feature-content">
                <h4 className="whyus-feature-title">{t('thoughtful_design')}</h4>
                <p className="whyus-feature-description">{t('thoughtful_design_description')}</p>
              </div>
            </div>

            <div className="whyus-feature-card">
              <div className="whyus-feature-icon-wrap">
                <CheckCircle2 className="whyus-feature-icon" />
              </div>
              <div className="whyus-feature-content">
                <h4 className="whyus-feature-title">{t('fair_pricing')}</h4>
                <p className="whyus-feature-description">{t('fair_pricing_description')}</p>
              </div>
            </div>

            <div className="whyus-feature-card">
              <div className="whyus-feature-icon-wrap">
                <CheckCircle2 className="whyus-feature-icon" />
              </div>
              <div className="whyus-feature-content">
                <h4 className="whyus-feature-title">{t('sustainable_practices')}</h4>
                <p className="whyus-feature-description">{t('sustainable_practices_description')}</p>
              </div>
            </div>

            <div className="whyus-feature-card">
              <div className="whyus-feature-icon-wrap">
                <CheckCircle2 className="whyus-feature-icon" />
              </div>
              <div className="whyus-feature-content">
                <h4 className="whyus-feature-title">{t('customer_support')}</h4>
                <p className="whyus-feature-description">{t('customer_support_description')}</p>
              </div>
            </div>

            <div className="whyus-feature-card">
              <div className="whyus-feature-icon-wrap">
                <CheckCircle2 className="whyus-feature-icon" />
              </div>
              <div className="whyus-feature-content">
                <h4 className="whyus-feature-title">{t('continuous_improvement')}</h4>
                <p className="whyus-feature-description">{t('continuous_improvement_description')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Advantages */}
        <section className="whyus-card-section">
          <div className="whyus-section-heading">
            <span className="whyus-sub-tag">KEY BENEFITS</span>
            <h2 className="whyus-section-title">{t('our_advantages')}</h2>
          </div>
          <div className="whyus-grid-3">
            <div className="whyus-adv-card">
              <div className="whyus-card-icon">
                <Gem className="whyus-card-icon-svg" />
              </div>
              <h3 className="whyus-card-title">{t('curated_selection')}</h3>
              <p className="whyus-card-text">{t('curated_selection_description')}</p>
            </div>

            <div className="whyus-adv-card">
              <div className="whyus-card-icon">
                <Zap className="whyus-card-icon-svg" />
              </div>
              <h3 className="whyus-card-title">{t('fast_shipping')}</h3>
              <p className="whyus-card-text">{t('fast_shipping_description')}</p>
            </div>

            <div className="whyus-adv-card">
              <div className="whyus-card-icon">
                <TrendingUp className="whyus-card-icon-svg" />
              </div>
              <h3 className="whyus-card-title">{t('growing_community')}</h3>
              <p className="whyus-card-text">{t('growing_community_description')}</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="whyus-card-section">
          <div className="whyus-section-heading">
            <span className="whyus-sub-tag">CUSTOMER REVIEWS</span>
            <h2 className="whyus-section-title">{t('what_our_customers_say')}</h2>
            <p className="whyus-section-heading-text">
              {t('customers_say_description')}
            </p>
          </div>
          <div className="whyus-grid-3">
            <div className="whyus-testimonial-card">
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="star-icon" size={15} fill="#ffffff" color="#ffffff" />
                ))}
              </div>
              <p className="whyus-testimonial-text">
                "{t('testimonial_1')}"
              </p>
              <div className="whyus-testimonial-footer">
                <span className="whyus-testimonial-author">{t('testimonial_author_1')}</span>
                <span className="verified-badge">
                  <i className="fa-solid fa-circle-check"></i> Verified Buyer
                </span>
              </div>
            </div>

            <div className="whyus-testimonial-card">
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="star-icon" size={15} fill="#ffffff" color="#ffffff" />
                ))}
              </div>
              <p className="whyus-testimonial-text">
                "{t('testimonial_2')}"
              </p>
              <div className="whyus-testimonial-footer">
                <span className="whyus-testimonial-author">{t('testimonial_author_2')}</span>
                <span className="verified-badge">
                  <i className="fa-solid fa-circle-check"></i> Verified Buyer
                </span>
              </div>
            </div>

            <div className="whyus-testimonial-card">
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="star-icon" size={15} fill="#ffffff" color="#ffffff" />
                ))}
              </div>
              <p className="whyus-testimonial-text">
                "{t('testimonial_3')}"
              </p>
              <div className="whyus-testimonial-footer">
                <span className="whyus-testimonial-author">{t('testimonial_author_3')}</span>
                <span className="verified-badge">
                  <i className="fa-solid fa-circle-check"></i> Verified Buyer
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="whyus-card-section whyus-cta-section">
          <div className="whyus-cta-content">
            <span className="whyus-sub-tag">JOIN US TODAY</span>
            <h2 className="whyus-section-title">{t('ready_upgrade_wardrobe')}</h2>
            <p className="whyus-cta-text">
              {t('upgrade_description')}
            </p>
            <div className="whyus-cta-button-wrapper">
              <button
                type="button"
                className="whyus-cta-button"
                onClick={() => navigate("/products")}
              >
                <span>{t('start_shopping')}</span>
                <i className="fa-solid fa-arrow-right cta-arrow"></i>
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WhyUs;
