import { useEffect, useState } from "react";
import {
    User,
    Mail,
    Phone,
    Globe,
    Building,
    Loader as Road,
    Lock,
    Save,
    Edit3,
} from "lucide-react";
import Navbar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { useTranslation } from "react-i18next";
import { useUser } from "../../Context/UserContext";
import "./UserProfile.css";

const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: {
        governorate: "",
        city: "",
        fullAddress: "",
    },
};

const initialPasswordData = {
    oldPassword: "",
    newPassword: "",
    confirmedPassword: "",
};

const UserProfile = () => {
    const { t } = useTranslation("UserProfile");
    const { profile, loading, getProfile, updateProfile, changePassword } = useUser();

    const [isEditing, setIsEditing] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [formData, setFormData] = useState(initialFormData);
    const [profileErrorMessage, setProfileErrorMessage] = useState("")
    const [profileSuccessMessage, setProfileSuccessMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [passwordSuccessMessage, setPasswordSuccessMessage] = useState("");
    const [passwordData, setPasswordData] = useState(initialPasswordData);

    // used to load the user profile info
    useEffect(() => {
        const loadProfile = async () => {
            try {
                await getProfile();
            } catch (error: any) {
                setProfileErrorMessage(error.message || "Failed to load profile");
            } finally {
                setIsInitialLoading(false);
            }
        };

        loadProfile();
    }, [getProfile]);

    // used to update the values of FormData from the getProfile endpoint
    useEffect(() => {
        if (!profile) {
            return;
        }

        setFormData({
            firstName: profile.firstName || "",
            lastName: profile.lastName || "",
            email: profile.email || "",
            phone: profile.phone || "",
            address: {
                governorate: profile.governorate || "",
                city: profile.city || "",
                fullAddress: profile.fullAddress || "",
            },
        });
    }, [profile]);

    // used to handle changing in any user info input value
    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // used to handle changing in user address input value
    const handleAddressChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            address: {
                ...prev.address,
                [field]: value,
            },
        }));
    };

    // used to handle changing in user passwords value
    const handlePasswordChange = (field: string, value: string) => {
        setPasswordData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // used to cancel and discart the changing before saving
    const handleCancel = () => {
        setIsEditing(false);
        setProfileErrorMessage("");
        setProfileSuccessMessage("");
        // setPasswordData(initialPasswordData);

        if (!profile) {
            setFormData(initialFormData);
            return;
        }

        setFormData({
            firstName: profile.firstName || "",
            lastName: profile.lastName || "",
            email: profile.email || "",
            phone: profile.phone || "",
            address: {
                governorate: profile.governorate || "",
                city: profile.city || "",
                fullAddress: profile.fullAddress || "",
            },
        });
    };

    // calling change password endpoint
    const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPasswordErrorMessage("");
        setPasswordSuccessMessage("");

        try {
            await changePassword(passwordData);
            setPasswordData(initialPasswordData);
            setPasswordSuccessMessage("Password changed successfully");
        } catch (error: any) {
            setPasswordErrorMessage(error.message || "Failed to change password");
        }
    }

    // calling seve the user info 
    const handleSave = async () => {
        setProfileErrorMessage("");
        setProfileSuccessMessage("");

        try {
            await updateProfile({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                governorate: formData.address.governorate,
                city: formData.address.city,
                fullAddress: formData.address.fullAddress,
            });
            setIsEditing(false);
            setProfileSuccessMessage("Profile updated successfully");
        } catch (error: any) {
            setProfileErrorMessage(error.message || "Failed to update profile");
        }
    }

    if (isInitialLoading) {
        return (
            <div>
                <Navbar></Navbar>
                <div className="profile-page">
                    <div className="container">
                        <div className="profile-page-content">
                            <div className="profile-section">
                                <p>{t("manage_personal_info")}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }

    return (
        <div>
            <Navbar></Navbar>

            <div className="profile-page">
                <div className="container">
                    <div className="profile-page-content">
                        <div className="profile-header">
                            <div className="profile-avatar">
                                <User size={48} />
                            </div>
                            <div className="profile-title">
                                <h1>{t("user_profile")}</h1>
                                <p>{t("manage_personal_info")}</p>
                            </div>
                            <div className="actions-buttons">
                                {!isEditing ? (
                                    <button onClick={() => setIsEditing(true)} className="edit-btn">
                                        <Edit3 size={18} />
                                        {t("edit_profile")}
                                    </button>
                                ) : (
                                    <div className="edit-actions">
                                        <button onClick={handleCancel} className="cancel-btn">
                                            {t("cancel")}
                                        </button>
                                        <button onClick={handleSave} className="save-btn" disabled={loading}>
                                            <Save size={18} />
                                            {loading ? "Saving..." : t("save_changes")}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="profile-content">
                            <div className="profile-section">
                                <h2 className="section-title">{t("personal_information")}</h2>
                                <p className="error-message" style={{ marginBottom: "16px" }}>
                                    {profileErrorMessage}
                                </p>
                                {!profileErrorMessage && profileSuccessMessage ? (
                                    <p className="success-message" style={{ marginBottom: "16px" }}>
                                        {profileSuccessMessage}
                                    </p>
                                ) : null}
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="form-label">
                                            <User size={18} />
                                            {t("first_name")}
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={formData.firstName}
                                                onChange={(e) => handleInputChange("firstName", e.target.value)}
                                                className="form-input"
                                                placeholder={t("enter_first_name")}
                                            />
                                        ) : (
                                            <div className="form-display">{formData.firstName}</div>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">
                                            <User size={18} />
                                            {t("last_name")}
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={formData.lastName}
                                                onChange={(e) => handleInputChange("lastName", e.target.value)}
                                                className="form-input"
                                                placeholder={t("enter_last_name")}
                                            />
                                        ) : (
                                            <div className="form-display">{formData.lastName}</div>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">
                                            <Mail size={18} />
                                            {t("email_address")}
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange("email", e.target.value)}
                                                className="form-input"
                                                placeholder={t("enter_email")}
                                            />
                                        ) : (
                                            <div className="form-display">{formData.email}</div>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">
                                            <Phone size={18} />
                                            {t("phone_number")}
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                                className="form-input"
                                                placeholder={t("enter_phone")}
                                            />
                                        ) : (
                                            <div className="form-display">{formData.phone}</div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="profile-section">
                                <h2 className="section-title">{t("address_information")}</h2>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="form-label">
                                            <Globe size={18} />
                                            {t("governorate")}
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={formData.address?.governorate || ""}
                                                onChange={(e) =>
                                                    handleAddressChange("governorate", e.target.value)
                                                }
                                                className="form-input"
                                                placeholder={t("enter_governorate")}
                                            />
                                        ) : (
                                            <div className="form-display">
                                                {formData.address?.governorate || ""}
                                            </div>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">
                                            <Building size={18} />
                                            {t("city")}
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={formData.address?.city || ""}
                                                onChange={(e) => handleAddressChange("city", e.target.value)}
                                                className="form-input"
                                                placeholder={t("enter_city")}
                                            />
                                        ) : (
                                            <div className="form-display">{formData.address?.city || ""}</div>
                                        )}
                                    </div>

                                    <div className="form-group full-width">
                                        <label className="form-label">
                                            <Road size={18} />
                                            {t("full_address")}
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={formData.address?.fullAddress || ""}
                                                onChange={(e) =>
                                                    handleAddressChange("fullAddress", e.target.value)
                                                }
                                                className="form-input"
                                                placeholder={t("enter_full_address")}
                                            />
                                        ) : (
                                            <div className="form-display">
                                                {formData.address?.fullAddress || ""}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="profile-section">
                                <h2 className="section-title">{t("change_password")}</h2>
                                <form onSubmit={handlePasswordSubmit} className="password-form">
                                    <p className="error-message">{passwordErrorMessage}</p>
                                    {!passwordErrorMessage && passwordSuccessMessage ? (
                                        <p className="success-message">{passwordSuccessMessage}</p>
                                    ) : null}
                                    <div className="form-grid">
                                        <div className="form-group full-width">
                                            <label className="form-label">
                                                <Lock size={18} />
                                                {t("current_password")}
                                            </label>
                                            <input
                                                type="password"
                                                value={passwordData.oldPassword}
                                                onChange={(e) =>
                                                    handlePasswordChange("oldPassword", e.target.value)
                                                }
                                                className="form-input"
                                                placeholder={t("enter_current_password")}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">
                                                <Lock size={18} />
                                                {t("new_password")}
                                            </label>
                                            <input
                                                type="password"
                                                value={passwordData.newPassword}
                                                onChange={(e) =>
                                                    handlePasswordChange("newPassword", e.target.value)
                                                }
                                                className="form-input"
                                                placeholder={t("enter_new_password")}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">
                                                <Lock size={18} />
                                                {t("confirm_new_password")}
                                            </label>
                                            <input
                                                type="password"
                                                value={passwordData.confirmedPassword}
                                                onChange={(e) =>
                                                    handlePasswordChange("confirmedPassword", e.target.value)
                                                }
                                                className="form-input"
                                                placeholder={t("confirm_password_placeholder")}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="password-actions">
                                        <button type="submit" className="change-password-btn" disabled={loading}>
                                            <Lock size={18} />
                                            {loading ? "Loading..." : t("change_password_button")}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Footer></Footer>
        </div>
    );
};

export default UserProfile;
