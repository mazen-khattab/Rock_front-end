// src/pages/Register.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../Context/AuthContext';
// import { toast } from "react-toastify";
import './Register.css';

const Register = () => {
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

  const [form, setForm] = useState({
    fname: '',
    lname: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register(form);

      setForm(initialForm);

      // Redirect to home page
      navigate('/', { replace: true });
    } catch (err: any) {
      setFormError(err.message || 'Register failed');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h1 className="register-title">Create Account</h1>
          <p className="register-subtitle">Join us and discover timeless style</p>
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

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-input-group">
            <div className='field'>
              <label htmlFor="fname" className="register-label">First Name</label>
              <input
                type="text"
                id="fname"
                value={form.fname}
                onChange={(e) => setForm((prev) => ({ ...prev, fname: e.target.value }))}
                className="register-input"
                required
              />
            </div>

            <div className='field'>
              <label htmlFor="lname" className="register-label">Last Name</label>
              <input
                type="text"
                id="lname"
                value={form.lname}
                onChange={(e) => setForm((prev) => ({ ...prev, lname: e.target.value }))}
                className="register-input"
                required
              />
            </div>
          </div>

          <div className="register-input-group">
            <div className="field">
              <label htmlFor="email" className="register-label">Phone</label>
              <input
                type="text"
                id="phoneNumber"
                value={form.phoneNumber}
                onChange={(e) => setForm((prev) => ({ ...prev, phoneNumber: e.target.value }))}
                className="register-input"
                required
              />
            </div>
          </div>

          <div className="register-input-group">
            <div className="field">
              <label htmlFor="email" className="register-label">Email Address</label>
              <input
                type="email"
                id="email"
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                className="register-input"
                required
              />
            </div>
          </div>

          <div className="register-input-group">
            <div className="field">
              <label htmlFor="password" className="register-label">Password</label>
              <div className="password-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={form.password}
                  onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                  className="register-input"
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
          </div>

          <div className="register-input-group">
            <div className="field">
              <label htmlFor="confirmPassword" className="register-label">Confirm Password</label>
              <div className="password-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={form.confirmPassword}
                  onChange={(e) => setForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                  className="register-input"
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
          </div>

          <button type="submit" className="register-btn">
            Create Account
          </button>
        </form>

        <div className="register-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="register-toggle-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
