// src/pages/Register.tsx
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Registering:', { name, email, password });
    // Add registration logic here
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h1 className="register-title">Create Account</h1>
          <p className="register-subtitle">Join us and discover timeless style</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-input-group">
            <label htmlFor="name" className="register-label">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="register-input"
              required
            />
          </div>

          <div className="register-input-group">
            <label htmlFor="email" className="register-label">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="register-input"
              required
            />
          </div>

          <div className="register-input-group">
            {/* <label htmlFor="password" className="register-label">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="register-input"
              required
              minLength={6}
            /> */}
            <label htmlFor="password" className="register-label">Password</label>
            <div className="password-wrap">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <div className="register-input-group">
            {/* <label htmlFor="confirmPassword" className="register-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="register-input"
              required
            /> */}
            <label htmlFor="confirmPassword" className="register-label">Confirm Password</label>
            <div className="password-wrap">
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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