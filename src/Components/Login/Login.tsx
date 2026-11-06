import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
import { useAuth } from '../../Context/AuthContext';
import logo from '../../assets/keef_navbar_logo.jpg';
import './Login.css';

const Login: React.FC = () => {
    const { login, error } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);
        setIsLoading(true);

        try {
            await login(email, password);
            setEmail('');
            setPassword('');
            navigate('/', { replace: true });
        } catch (err: any) {
            console.error("[login page] error: ", err);
            setFormError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    const displayError = formError || error;

    return (
        <div className="auth-page login-page login-container">
            <div className="auth-ambient-glow" aria-hidden="true" />

            <div className="auth-top-bar">
                <Link to="/" className="auth-back-link">
                    <ArrowLeft size={16} />
                    <span>Back to store</span>
                </Link>
            </div>

            <div className="auth-card login-card">
                {/* Header & Brand */}
                <div className="auth-header login-header">
                    <Link to="/" className="auth-logo-link" aria-label="Keef Home">
                        <img src={logo} alt="Keef Logo" className="auth-logo-img" />
                    </Link>
                    <span className="auth-badge">
                        <span className="badge-dot" />
                        SIGN IN
                    </span>
                    <h1 className="auth-title login-title">Welcome Back</h1>
                    <p className="auth-subtitle login-subtitle">Sign in to access your account and orders</p>
                </div>

                {/* Error Banner */}
                {displayError && (
                    <div className="auth-error-banner error-box" role="alert">
                        <AlertCircle size={18} className="auth-error-icon" />
                        <span className="auth-error-text error-text">{displayError}</span>
                    </div>
                )}

                {/* Form */}
                <form className="auth-form login-form" onSubmit={handleSubmit}>
                    <div className="auth-form-group login-input-group">
                        <label htmlFor="login-email" className="auth-label login-label">
                            <Mail size={15} />
                            <span>Email Address</span>
                            <span className="required-star">*</span>
                        </label>
                        <input
                            type="email"
                            id="login-email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (formError) setFormError(null);
                            }}
                            className="auth-input login-input"
                            placeholder="name@example.com"
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="auth-form-group login-input-group">
                        <label htmlFor="login-password" className="auth-label login-label">
                            <Lock size={15} />
                            <span>Password</span>
                            <span className="required-star">*</span>
                        </label>
                        <div className="auth-password-wrap password-wrap">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="login-password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (formError) setFormError(null);
                                }}
                                className="auth-input auth-password-input login-input"
                                placeholder="Enter your password"
                                autoComplete="current-password"
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

                    <button
                        type="submit"
                        className="auth-submit-btn login-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 size={18} className="auth-spinner" />
                                <span>Signing in...</span>
                            </>
                        ) : (
                            <span>Sign In</span>
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div className="auth-footer login-footer">
                    <p className="auth-footer-text">
                        Don’t have an account?{' '}
                        <Link to="/register" className="auth-link login-toggle-link">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
