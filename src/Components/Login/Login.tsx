// src/pages/Login.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../Context/AuthContext';
import './Login.css';

const Login = () => {
    const { login, error } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);

        try {
            // Call auth context login
            await login(email, password);

            // Success! Clear form
            setEmail('');
            setPassword('');

            // Redirect to home page
            navigate('/', { replace: true });
        } catch (err: any) {
            // Show error to user
            setFormError(err.message || 'Login failed');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1 className="login-title">Welcome Back</h1>
                    <p className="login-subtitle">Sign in to your account</p>
                </div>

                {(formError || error) && (
                    <div className="error-box">
                        <div className="error-flex">
                            <div className="error-icon-wrapper">
                                <span className="error-icon">⚠️</span>
                            </div>
                            <div className="error-content">
                                <p className="error-text">
                                    {formError || error}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-input-group">
                        <label htmlFor="email" className="login-label">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="login-input"
                            required
                        />
                    </div>

                    <div className="login-input-group">
                        <label htmlFor="password" className="login-label">Password</label>
                        <div className="password-wrap">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="login-input"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="password-toggle-btn"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="login-btn">
                        Sign In
                    </button>
                </form>

                <div className="login-footer">
                    <p>
                        Don’t have an account?{' '}
                        <Link to="/register" className="login-toggle-link">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;