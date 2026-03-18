import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useContactUs } from "../../../Context/ContactUsContext";
import { toast } from "react-toastify";
import "./Contact.css";

const Contact = () => {
  const { t } = useTranslation("Home");
  const savedLang = localStorage.getItem("lang");
  const { contactUs, loading } = useContactUs();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await contactUs({
        name: formData.name,
        phone: formData.phone,
      });

      if (response.isSucess) {
        setFormData({ name: "", phone: "" });
        toast.success(t("contactUs.contact_message"));
      }
    } catch (error) {
      console.error("[Contact] contactUs failed", error);
    }
  };

  return (
    <section className="container contact-container">
      <div
        className={
          savedLang === `ar` ? "contact contact-ar" : "contact contact-en"
        }
      >
        <div className="contact-content">
          <div
            className={
              savedLang === `ar`
                ? "contact-info contact-info-ar"
                : "contact-info contact-info-en"
            }
          >
            <h3>{t("contactUs.get_in_touch")}</h3>
            <div className="info-item">
              <i className="fa-solid fa-envelope info-icon"></i>
              <div className="info-text">
                <h4>{t("contactUs.email")}</h4>
                <p>ONOStore@gmail.com</p>
              </div>
            </div>
            <div className="info-item">
              <i className="fa-solid fa-phone-flip info-icon"></i>
              <div className="info-text">
                <h4>{t("contactUs.phone")}</h4>
                <p>01023839637</p>
              </div>
            </div>
            <div className="info-item">
              <i className="fa-solid fa-location-dot info-icon"></i>
              <div className="info-text">
                <h4>{t("contactUs.address")}</h4>
                <p>------------</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-header">
              <h2 className="contact-title">{t("contactUs.need_help")}</h2>
              <p className="contact-subtitle">{t("contactUs.subtitle")}</p>
            </div>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                {t("contactUs.name")}
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
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                {t("contactUs.phone_label")}
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
                disabled={loading}
              />
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              <div>
                <span style={{ padding: "8px" }}>
                  {loading ? "Sending..." : t("contactUs.send_message")}
                </span>
                {loading ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  <i className="fa-solid fa-paper-plane"></i>
                )}
              </div>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
