import './Footer.css'
import Logo from '../../../assets/Rock_logo.jpg'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Logo */}
                <div className="footer-logo">
                    <div className="logo-circle">
                        <img src={Logo} alt="" />
                    </div>
                </div>

                {/* Description */}
                <p className="footer-description">
                    Styling your wardrobe with premium fashion and timeless designs for every occasion.
                </p>

                {/* Social Media Icons */}
                <div className="social-icons">
                    <a href="#" className="social-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                        </svg>
                    </a>
                    <a href="#" className="social-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1112.63 8H12a4 4 0 110 8h.63a4 4 0 113.74-3.63z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* Copyright */}
            <div className="footer-bottom">
                <p>© 2025 Rock Fashion. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;