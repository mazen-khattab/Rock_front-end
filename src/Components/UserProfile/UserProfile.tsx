import { useEffect, useState } from "react";
import {
    User,
    Mail,
    Phone,
    Globe,
    Building,
    MapPin,
    Lock,
    Save,
    Edit3,
    Loader2,
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
    const [profileErrorMessage, setProfileErrorMessage] = useState("");
    const [profileSuccessMessage, setProfileSuccessMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [passwordSuccessMessage, setPasswordSuccessMessage] = useState("");
    const [passwordData, setPasswordData] = useState(initialPasswordData);

    // load user profile info
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

    // sync formData from profile
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

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleAddressChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            address: {
                ...prev.address,
                [field]: value,
            },
        }));
    };

    const handlePasswordChange = (field: string, value: string) => {
        setPasswordData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleCancel = () => {
        setIsEditing(false);
        setProfileErrorMessage("");
        setProfileSuccessMessage("");

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
    };

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
    };

    if (isInitialLoading) {
        return (
            <div>
                <Navbar />
                <div className="profile-page container">
                    <div className="profile-loading">
                        <Loader2 className="profile-loading-icon" size={44} />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Navbar />

            <main className="profile-page container">
                <div className="profile-page-content">
                    {/* Header */}
                    <div className="profile-header">
                        <div className="profile-avatar">
                            <User size={38} />
                        </div>
                        <div className="profile-title">
                            <h1>{t("user_profile")}</h1>
                            <p>{t("manage_personal_info")}</p>
                        </div>
                        <div className="actions-buttons">
                            {!isEditing ? (
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(true)}
                                    className="edit-btn"
                                >
                                    <Edit3 size={16} />
                                    <span>{t("edit_profile")}</span>
                                </button>
                            ) : (
                                <div className="edit-actions">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="cancel-btn"
                                    >
                                        <span>{t("cancel")}</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSave}
                                        className="save-btn"
                                        disabled={loading}
                                    >
                                        <Save size={16} />
                                        <span>{loading ? "Saving..." : t("save_changes")}</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="profile-content">
                        {/* Personal Information */}
                        <div className="profile-section">
                            <h2 className="section-title">{t("personal_information")}</h2>
                            {profileErrorMessage && (
                                <p className="error-message">{profileErrorMessage}</p>
                            )}
                            {!profileErrorMessage && profileSuccessMessage && (
                                <p className="success-message">{profileSuccessMessage}</p>
                            )}
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">
                                        <User size={16} />
                                        <span>{t("first_name")}</span>
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
                                        <div className="form-display">{formData.firstName || "—"}</div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        <User size={16} />
                                        <span>{t("last_name")}</span>
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
                                        <div className="form-display">{formData.lastName || "—"}</div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        <Mail size={16} />
                                        <span>{t("email_address")}</span>
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
                                        <div className="form-display">{formData.email || "—"}</div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        <Phone size={16} />
                                        <span>{t("phone_number")}</span>
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
                                        <div className="form-display">{formData.phone || "—"}</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Address Information */}
                        <div className="profile-section">
                            <h2 className="section-title">{t("address_information")}</h2>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">
                                        <Globe size={16} />
                                        <span>{t("governorate")}</span>
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
                                            {formData.address?.governorate || "—"}
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        <Building size={16} />
                                        <span>{t("city")}</span>
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
                                        <div className="form-display">{formData.address?.city || "—"}</div>
                                    )}
                                </div>

                                <div className="form-group full-width">
                                    <label className="form-label">
                                        <MapPin size={16} />
                                        <span>{t("full_address")}</span>
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
                                            {formData.address?.fullAddress || "—"}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Change Password */}
                        <div className="profile-section">
                            <h2 className="section-title">{t("change_password")}</h2>
                            <form onSubmit={handlePasswordSubmit} className="password-form">
                                {passwordErrorMessage && (
                                    <p className="error-message">{passwordErrorMessage}</p>
                                )}
                                {!passwordErrorMessage && passwordSuccessMessage && (
                                    <p className="success-message">{passwordSuccessMessage}</p>
                                )}
                                <div className="form-grid">
                                    <div className="form-group full-width">
                                        <label className="form-label">
                                            <Lock size={16} />
                                            <span>{t("current_password")}</span>
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
                                            <Lock size={16} />
                                            <span>{t("new_password")}</span>
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
                                            <Lock size={16} />
                                            <span>{t("confirm_new_password")}</span>
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
                                    <button
                                        type="submit"
                                        className="change-password-btn"
                                        disabled={loading}
                                    >
                                        <Lock size={16} />
                                        <span>{loading ? "Loading..." : t("change_password_button")}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default UserProfile;
