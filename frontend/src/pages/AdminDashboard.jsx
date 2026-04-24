import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import '../App.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, instructors: 0, students: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    // Security Check: Agar role Admin nahi hai toh login pe bhej do
    const role = localStorage.getItem('userRole');
    if (role !== 'Admin') {
      navigate('/login');
    } else {
      fetchUsers();
    }
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const res = await API.get('/admin/users');
      setUsers(res.data);
      
      // Analytics/Reports ke liye stats calculate karna [cite: 37, 67]
      const instructors = res.data.filter(u => u.role === 'Instructor').length;
      const students = res.data.filter(u => u.role === 'Student').length;
      setStats({ totalUsers: res.data.length, instructors, students });
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await API.delete(`/admin/users/${id}`);
        alert('User deleted successfully! 🗑️');
        fetchUsers(); // List refresh karo
      } catch (err) {
        alert('Failed to delete user');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <div className="sf-dashboard-page">
      <nav className="sf-dash-nav">
        <div className="sf-dash-brand">🎓 SkillForge Admin</div>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </nav>

      <div className="sf-container">
        <div className="sf-welcome-banner" style={{background: 'linear-gradient(135deg, #1A1A2E 0%, #111111 100%)'}}>
          <div className="sf-welcome-text">
            <h1>Admin Control Center</h1>
            <p>Monitor analytics, manage users, and control the entire platform.</p>
          </div>
          <div className="sf-role-badge" style={{color: '#FFD700', borderColor: '#FFD700'}}>👑 Master Admin</div>
        </div>

        {/* Analytics Section [cite: 37, 67] */}
        <div className="sf-stats-row">
          <div className="sf-stat-card">
            <div className="sf-stat-icon">👥</div>
            <div className="sf-stat-info">
              <h4>{stats.totalUsers}</h4>
              <p>Total Users</p>
            </div>
          </div>
          <div className="sf-stat-card">
            <div className="sf-stat-icon" style={{color: '#F5A623'}}>👨‍🏫</div>
            <div className="sf-stat-info">
              <h4>{stats.instructors}</h4>
              <p>Instructors</p>
            </div>
          </div>
          <div className="sf-stat-card">
            <div className="sf-stat-icon" style={{color: '#28a745'}}>🎓</div>
            <div className="sf-stat-info">
              <h4>{stats.students}</h4>
              <p>Students</p>
            </div>
          </div>
        </div>

        {/* Manage Users Table [cite: 65] */}
        <div style={{ background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' }}>
          <h2 style={{ marginBottom: '30px' }}>User Management</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee' }}>
                <th style={{ padding: '15px' }}>Name</th>
                <th style={{ padding: '15px' }}>Email</th>
                <th style={{ padding: '15px' }}>Role</th>
                <th style={{ padding: '15px' }}>Registered At</th>
                <th style={{ padding: '15px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px', fontWeight: '600' }}>{user.name}</td>
                  <td style={{ padding: '15px' }}>{user.email}</td>
                  <td style={{ padding: '15px' }}>
                    <span style={{ 
                      padding: '4px 10px', 
                      borderRadius: '6px', 
                      fontSize: '12px',
                      background: user.role === 'Instructor' ? '#E3F2FD' : '#F1F8E9',
                      color: user.role === 'Instructor' ? '#1976D2' : '#388E3C'
                    }}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: '15px', color: '#888', fontSize: '13px' }}>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '15px' }}>
                    <button 
                      onClick={() => handleDeleteUser(user._id)}
                      style={{ background: '#FFEBEB', color: '#D32F2F', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;