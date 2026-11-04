import { Heart, Leaf, Users, Award } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Navbar from '../Home/Navbar/Navbar';
import Footer from '../Home/Footer/Footer';
import storyImg from '../../assets/t-shirts2.jpg';
import './About.css';

const About = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('About');

  return (
    <div>
      <Navbar />

      <main className="about-page container">
        {/* Header Hero Card */}
        <header className="about-header-card">
          <div className="about-badge">
            <span className="badge-dot"></span>
            <span>KEEF APPAREL</span>
          </div>
          <h1 className="about-header-title">{t('our_story')}</h1>
          <p className="about-header-subtitle">
            {t('crafting_timeless_fashion')}
          </p>
        </header>

        {/* Our Beginning Section */}
        <section className="about-card-section">
          <div className="about-grid-2">
            <div className="about-text-content">
              <span className="about-sub-tag">SINCE 2015</span>
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
            <div className="about-image-wrapper">
              <img
                src={storyImg}
                alt={t('our_beginning')}
                className="about-story-img"
              />
              <div className="about-image-badge">
                <span className="badge-year">EST. 2015</span>
                <span className="badge-text">KEEF CLOTHING</span>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="about-card-section">
          <div className="about-section-heading">
            <span className="about-sub-tag">CORE PRINCIPLES</span>
            <h2 className="about-section-title">{t('our_values')}</h2>
          </div>
          <div className="about-grid-4">
            <div className="about-val-card">
              <div className="about-card-icon">
                <Leaf className="about-card-icon-svg" />
              </div>
              <h3 className="about-card-title">{t('sustainability')}</h3>
              <p className="about-card-text">
                {t('sustainability_text')}
              </p>
            </div>

            <div className="about-val-card">
              <div className="about-card-icon">
                <Heart className="about-card-icon-svg" />
              </div>
              <h3 className="about-card-title">{t('ethics')}</h3>
              <p className="about-card-text">
                {t('ethics_text')}
              </p>
            </div>

            <div className="about-val-card">
              <div className="about-card-icon">
                <Award className="about-card-icon-svg" />
              </div>
              <h3 className="about-card-title">{t('quality')}</h3>
              <p className="about-card-text">
                {t('quality_text')}
              </p>
            </div>

            <div className="about-val-card">
              <div className="about-card-icon">
                <Users className="about-card-icon-svg" />
              </div>
              <h3 className="about-card-title">{t('community')}</h3>
              <p className="about-card-text">
                {t('community_text')}
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="about-card-section about-mission-section">
          <div className="about-mission-content">
            <div className="mission-icon-wrap">
              <i className="fa-solid fa-quote-left mission-quote-icon"></i>
            </div>
            <span className="about-sub-tag">PURPOSE & VISION</span>
            <h2 className="about-section-title">{t('our_mission')}</h2>
            <p className="about-mission-text">
              {t('mission_text')}
            </p>
          </div>
        </section>

        {/* Join Our Journey (CTA) Section */}
        <section className="about-card-section about-cta-section">
          <div className="about-cta-content">
            <span className="about-sub-tag">BE A PART OF IT</span>
            <h2 className="about-section-title">{t('join_our_journey')}</h2>
            <p className="about-cta-text">
              {t('journey_text')}
            </p>
            <div className="about-btn-group">
              <button
                type="button"
                className="about-btn-primary"
                onClick={() => navigate("/products")}
              >
                <span>{t('shop_now')}</span>
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

export default About;
