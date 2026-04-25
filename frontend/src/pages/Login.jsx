import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import '../App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userRole', res.data.user.role); 
      
      const role = res.data.user.role.trim(); 
console.log("Database se aaya hua role:", role); 

if (role === 'Admin') {
    navigate('/admin-dashboard');
} else if (role === 'Instructor') {
    navigate('/instructor-dashboard');
} else {
    navigate('/student-dashboard');
}
      
    } catch (err) {
      console.error(err);
      setError('Invalid credentials');
    }
  };

  return (
    <div className="sf-auth-page">
      <div className="sf-auth-card">
        <Link to="/" className="sf-auth-brand">🎓 SkillForge</Link>
        <h2>Welcome Back</h2>
        <p>Log in to access your courses and dashboard.</p>

        {error && <div className="alert alert-danger" style={{borderRadius: '10px'}}>{error}</div>}

        <form className="sf-auth-form" onSubmit={handleLogin}>
          <label className="sf-auth-label">Email Address</label>
          <input type="email" className="sf-auth-input" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label className="sf-auth-label">Password</label>
          <input type="password" className="sf-auth-input" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button type="submit" className="btn-primary-sf sf-auth-btn">Log In</button>
        </form>

        <div className="sf-auth-switch">
          Don't have an account? <Link to="/register">Create one now</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;