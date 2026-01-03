import { useState } from "react";
import './Contact.css'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        message: "",
    });

    const langString = localStorage.getItem("lang");
    const savedLang = langString ? JSON.parse(langString) : null;

    return (
        <section className="container contact-container">
            <div className={
                savedLang?.code === `ar` ? "contact contact-ar" : "contact contact-en"
            }>
                <div className="contact-content">
                    <div
                        className={
                            savedLang?.code === `ar`
                                ? "contact-info contact-info-ar"
                                : "contact-info contact-info-en"
                        }
                    >
                        <h3>Get in Touch</h3>
                        <div className="info-item">
                            <i className="fa-solid fa-envelope info-icon"></i>
                            <div className="info-text">
                                <h4>Email</h4>
                                <p>ONOStore@gmail.com</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <i className="fa-solid fa-phone-flip info-icon"></i>
                            <div className="info-text">
                                <h4>Phone</h4>
                                <p>01023839637</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <i className="fa-solid fa-location-dot info-icon"></i>
                            <div className="info-text">
                                <h4>Address</h4>
                                <p>------------</p>
                            </div>
                        </div>
                    </div>

                    <form className="contact-form">
                        <div className="contact-header">
                            <h2 className="contact-title">Need Help?</h2>
                            <p className="contact-subtitle">if you have any questions, feel free to contact us</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                className="form-input"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone" className="form-label">
                                Phone
                            </label>
                            <input
                                type="number"
                                id="phone"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                }
                                className="form-input"
                                required
                            />
                        </div>
                        <button type="submit" className="submit-btn">
                            <div>
                                <span style={{ padding: "8px" }}>
                                    Send Message
                                </span>
                                <i className="fa-solid fa-paper-plane"></i>
                            </div>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Contact;