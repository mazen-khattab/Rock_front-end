import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Phone, Lock, Eye, EyeOff, AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
import { useAuth } from '../../Context/AuthContext';
import logo from '../../assets/keef_navbar_logo.jpg';
import './Register.css';

const Register: React.FC = () => {
    const { register, error } = useAuth();
    const navigate = useNavigate();

    const initialForm = {
        fname: '',
        lname: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const [form, setForm] = useState(initialForm);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (field: keyof typeof initialForm, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (formError) setFormError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);

        if (form.password !== form.confirmPassword) {
            setFormError('Passwords do not match.');
            return;
        }

        if (form.password.length < 6) {
            setFormError('Password must be at least 6 characters.');
            return;
        }

        setIsLoading(true);

        try {
            await register(form);
            setForm(initialForm);
            navigate('/', { replace: true });
        } catch (err: any) {
            console.error("[register page] error: ", err);
            setFormError(err.message || 'Registration failed. Please check your details.');
        } finally {
            setIsLoading(false);
        }
    };

    const displayError = formError || error;

    return (
        <div className="auth-page register-page register-container">
            <div className="auth-ambient-glow" aria-hidden="true" />

            <div className="auth-top-bar">
                <Link to="/" className="auth-back-link">
                    <ArrowLeft size={16} />
                    <span>Back to store</span>
                </Link>
            </div>

            <div className="auth-card auth-card-register register-card">
                {/* Header & Brand */}
                <div className="auth-header register-header">
                    <Link to="/" className="auth-logo-link" aria-label="Keef Home">
                        <img src={logo} alt="Keef Logo" className="auth-logo-img" />
                    </Link>
                    <span className="auth-badge">
                        <span className="badge-dot" />
                        GET STARTED
                    </span>
                    <h1 className="auth-title register-title">Create Account</h1>
                    <p className="auth-subtitle register-subtitle">Join us and discover timeless minimalist fashion</p>
                </div>

                {/* Error Banner */}
                {displayError && (
                    <div className="auth-error-banner error-box" role="alert">
                        <AlertCircle size={18} className="auth-error-icon" />
                        <span className="auth-error-text error-text">{displayError}</span>
                    </div>
                )}

                {/* Form */}
                <form className="auth-form register-form" onSubmit={handleSubmit}>
                    {/* Name Row (2 columns on tablet/desktop, stacked on mobile) */}
                    <div className="auth-form-row">
                        <div className="auth-form-group">
                            <label htmlFor="reg-fname" className="auth-label register-label">
                                <User size={15} />
                                <span>First Name</span>
                                <span className="required-star">*</span>
                            </label>
                            <input
                                type="text"
                                id="reg-fname"
                                value={form.fname}
                                onChange={(e) => handleChange('fname', e.target.value)}
                                className="auth-input register-input"
                                placeholder="Mazen"
                                autoComplete="given-name"
                                required
                            />
                        </div>

                        <div className="auth-form-group">
                            <label htmlFor="reg-lname" className="auth-label register-label">
                                <User size={15} />
                                <span>Last Name</span>
                                <span className="required-star">*</span>
                            </label>
                            <input
                                type="text"
                                id="reg-lname"
                                value={form.lname}
                                onChange={(e) => handleChange('lname', e.target.value)}
                                className="auth-input register-input"
                                placeholder="Khattab"
                                autoComplete="family-name"
                                required
                            />
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div className="auth-form-group register-input-group">
                        <label htmlFor="reg-phone" className="auth-label register-label">
                            <Phone size={15} />
                            <span>Phone Number</span>
                            <span className="required-star">*</span>
                        </label>
                        <input
                            type="tel"
                            id="reg-phone"
                            value={form.phoneNumber}
                            onChange={(e) => handleChange('phoneNumber', e.target.value)}
                            className="auth-input register-input"
                            placeholder="01012345678"
                            autoComplete="tel"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="auth-form-group register-input-group">
                        <label htmlFor="reg-email" className="auth-label register-label">
                            <Mail size={15} />
                            <span>Email Address</span>
                            <span className="required-star">*</span>
                        </label>
                        <input
                            type="email"
                            id="reg-email"
                            value={form.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className="auth-input register-input"
                            placeholder="name@example.com"
                            autoComplete="email"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="auth-form-group register-input-group">
                        <label htmlFor="reg-password" className="auth-label register-label">
                            <Lock size={15} />
                            <span>Password</span>
                            <span className="required-star">*</span>
                        </label>
                        <div className="auth-password-wrap password-wrap">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="reg-password"
                                value={form.password}
                                onChange={(e) => handleChange('password', e.target.value)}
                                className="auth-input auth-password-input register-input"
                                placeholder="At least 6 characters"
                                autoComplete="new-password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="auth-password-toggle password-toggle-btn"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="auth-form-group register-input-group">
                        <label htmlFor="reg-confirm-password" className="auth-label register-label">
                            <Lock size={15} />
                            <span>Confirm Password</span>
                            <span className="required-star">*</span>
                        </label>
                        <div className="auth-password-wrap password-wrap">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="reg-confirm-password"
                                value={form.confirmPassword}
                                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                                className="auth-input auth-password-input register-input"
                                placeholder="Re-enter your password"
                                autoComplete="new-password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="auth-password-toggle password-toggle-btn"
                                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="auth-submit-btn register-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 size={18} className="auth-spinner" />
                                <span>Creating Account...</span>
                            </>
                        ) : (
                            <span>Create Account</span>
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div className="auth-footer register-footer">
                    <p className="auth-footer-text">
                        Already have an account?{' '}
                        <Link to="/login" className="auth-link register-toggle-link">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
