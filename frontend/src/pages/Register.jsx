import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import '../App.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Student', secretKey: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', formData);
      setSuccess('Account created! Redirecting to login...');
      setError('');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed');
      setSuccess('');
    }
  };

  return (
    <div className="sf-auth-page">
      <div className="sf-auth-card">
        <Link to="/" className="sf-auth-brand">🎓 SkillForge</Link>
        <h2>Create Account</h2>
        <p>Join our community of learners and experts.</p>

        {error && <div className="alert alert-danger" style={{borderRadius: '10px'}}>{error}</div>}
        {success && <div className="alert alert-success" style={{borderRadius: '10px'}}>{success}</div>}

        <form className="sf-auth-form" onSubmit={handleRegister}>
          
          <label className="sf-auth-label">Full Name</label>
          <input 
            type="text" 
            className="sf-auth-input" 
            placeholder="e.g. Muhammad Ubaid"
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            required 
          />

          <label className="sf-auth-label">Email Address</label>
          <input 
            type="email" 
            className="sf-auth-input" 
            placeholder="you@example.com"
            value={formData.email} 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
            required 
          />

          <label className="sf-auth-label">Password</label>
          <input 
            type="password" 
            className="sf-auth-input" 
            placeholder="Min. 6 characters"
            value={formData.password} 
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
            required 
          />

          <label className="sf-auth-label">I want to...</label>
          <select 
            className="sf-auth-select"
            value={formData.role} 
            onChange={(e) => setFormData({...formData, role: e.target.value})}
          >
            <option value="Student">Learn (Student Account)</option>
            <option value="Instructor">Teach (Instructor Account)</option>
          </select>

          {formData.role === 'Instructor' && (
            <div style={{ animation: 'fadeIn 0.3s ease' }}>
              <label className="sf-auth-label" style={{color: 'var(--primary)'}}>Admin Approval Code 🔒</label>
              <input 
                type="password" 
                className="sf-auth-input" 
                placeholder="Enter the secret code to become Instructor"
                value={formData.secretKey} 
                onChange={(e) => setFormData({...formData, secretKey: e.target.value})} 
                required 
              />
            </div>
          )}

          <button type="submit" className="btn-primary-sf sf-auth-btn">Sign Up</button>
        </form>

        <div className="sf-auth-switch">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;