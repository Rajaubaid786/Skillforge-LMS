import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import '../App.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]); // Naya state courses ke liye
  const [stats, setStats] = useState({ totalUsers: 0, instructors: 0, students: 0, totalCourses: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role !== 'Admin') {
      navigate('/login');
    } else {
      fetchData();
    }
  }, [navigate]);

  const fetchData = async () => {
    try {
      // Users aur Courses dono aik sath fetch karo
      const [userRes, courseRes] = await Promise.all([
        API.get('/admin/users'),
        API.get('/courses')
      ]);

      setUsers(userRes.data);
      setCourses(courseRes.data);
      
      const instructors = userRes.data.filter(u => u.role === 'Instructor').length;
      const students = userRes.data.filter(u => u.role === 'Student').length;
      
      setStats({ 
        totalUsers: userRes.data.length, 
        instructors, 
        students,
        totalCourses: courseRes.data.length // Stats mein courses add kiye
      });
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await API.delete(`/admin/users/${id}`);
        alert('User deleted successfully! 🗑️');
        fetchData(); 
      } catch (err) {
        alert('Failed to delete user');
      }
    }
  };

  // Naya function Course delete karne ke liye
  const handleDeleteCourse = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await API.delete(`/courses/${id}`);
        alert('Course removed successfully! 📚');
        fetchData(); 
      } catch (err) {
        alert('Failed to delete course');
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
            <p>Monitor analytics and manage the platform assets.</p>
          </div>
        </div>

        {/* Updated Analytics Section */}
        <div className="sf-stats-row">
          <div className="sf-stat-card">
            <div className="sf-stat-icon">👥</div>
            <div className="sf-stat-info">
              <h4>{stats.totalUsers}</h4>
              <p>Total Users</p>
            </div>
          </div>
          <div className="sf-stat-card">
            <div className="sf-stat-icon" style={{color: '#F5A623'}}>📚</div>
            <div className="sf-stat-info">
              <h4>{stats.totalCourses}</h4>
              <p>Total Courses</p>
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

        {/* User Management Table */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', marginBottom: '30px' }}>
          <h2 style={{ marginBottom: '20px' }}>👤 User Management</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee' }}>
                <th style={{ padding: '12px' }}>Name</th>
                <th style={{ padding: '12px' }}>Email</th>
                <th style={{ padding: '12px' }}>Role</th>
                <th style={{ padding: '12px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px', fontWeight: '600' }}>{user.name}</td>
                  <td style={{ padding: '12px' }}>{user.email}</td>
                  <td style={{ padding: '12px' }}>{user.role}</td>
                  <td style={{ padding: '12px' }}>
                    <button onClick={() => handleDeleteUser(user._id)} className="btn-del-sf">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* NEW: Course Management Table */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' }}>
          <h2 style={{ marginBottom: '20px' }}>📚 Course Management</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee' }}>
                <th style={{ padding: '12px' }}>Course Title</th>
                <th style={{ padding: '12px' }}>Category</th>
                <th style={{ padding: '12px' }}>Price</th>
                <th style={{ padding: '12px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px', fontWeight: '600' }}>{course.title}</td>
                  <td style={{ padding: '12px' }}>{course.category}</td>
                  <td style={{ padding: '12px' }}>${course.price}</td>
                  <td style={{ padding: '12px' }}>
                    <button onClick={() => handleDeleteCourse(course._id)} className="btn-del-sf">Remove</button>
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