import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import '../App.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const userRes = await API.get('/auth/me');
      const enrollRes = await API.get('/enrollments/my-courses');
      setUser(userRes.data);
      setNewName(userRes.data.name);
      setEnrollments(enrollRes.data);
    } catch (err) {
      console.error("Profile fetch error", err);
    }
  };

  const handleUpdate = async () => {
    try {
      await API.put('/auth/update-profile', { name: newName });
      alert("Profile Updated! ✅");
      setIsEditing(false);
      fetchProfile();
    } catch (err) {
      alert("Update failed!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="sf-container" style={{padding: '50px', textAlign: 'center'}}>
        <h2>Loading Profile Data...</h2>
      </div>
    );
  }

  return (
    <div className="sf-dashboard-page">
      <div className="sf-container">
        {/* Header Section */}
        <div className="sf-welcome-banner" style={{background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)'}}>
          <div className="sf-welcome-text">
            <h1>My Profile Settings</h1>
            <p>Manage your account, personal info, and learning status.</p>
          </div>
          <button className="btn-logout" onClick={handleLogout} style={{alignSelf: 'center'}}>
            Logout 🚪
          </button>
        </div>

        <div className="sf-dash-layout">
          {/* Left Side: User Card */}
          <div className="sf-dash-sidebar" style={{textAlign: 'center', padding: '40px 20px'}}>
            <div style={{
              width: '100px', height: '100px', background: 'var(--primary)', 
              borderRadius: '50%', margin: '0 auto 20px', display: 'flex', 
              alignItems: 'center', justifyContent: 'center', fontSize: '40px', color: 'white'
            }}>
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            
            {isEditing ? (
              <input 
                type="text" 
                className="sf-auth-input" 
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                autoFocus
              />
            ) : (
              <h2 style={{marginBottom: '5px'}}>{user.name}</h2>
            )}
            <p style={{color: '#888', marginBottom: '20px'}}>{user.email}</p>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <button 
                className="btn-primary-sf" 
                onClick={() => isEditing ? handleUpdate() : setIsEditing(true)}
                >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
                {isEditing && (
                    <button onClick={() => setIsEditing(false)} style={{background: 'none', border: 'none', color: 'red', cursor: 'pointer'}}>
                        Cancel
                    </button>
                )}
            </div>
          </div>

          {/* Right Side: Stats & Details */}
          <div className="sf-dash-main">
            <h3 style={{marginBottom: '20px'}}>Learning Activity</h3>
            <div className="sf-stats-row" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
              <div className="sf-stat-card">
                <h4 style={{fontSize: '32px', color: 'var(--primary)'}}>{enrollments.length}</h4>
                <p>Enrolled Courses</p>
              </div>
              <div className="sf-stat-card">
                <h4 style={{fontSize: '32px', color: '#28a745'}}>Active</h4>
                <p>Account Status</p>
              </div>
            </div>

            <div style={{marginTop: '30px', background: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)'}}>
              <h4>Personal Details</h4>
              <div style={{marginTop: '15px'}}>
                <p style={{borderBottom: '1px solid #eee', padding: '10px 0'}}>
                    <strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}
                </p>
                <p style={{borderBottom: '1px solid #eee', padding: '10px 0'}}>
                    <strong>Role:</strong> {user.role}
                </p>
                <p style={{padding: '10px 0'}}><strong>Security:</strong> Verified Account</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;