import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import '../App.css';

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({ title: '', price: '', seats: '' });
  const [editingId, setEditingId] = useState(null); 
  const [enrolledStudents, setEnrolledStudents] = useState([]); 
  const [viewingCourseId, setViewingCourseId] = useState(null);
  
  // Lesson state
  const [lessonData, setLessonData] = useState({ title: '', content: '' });
  const [addingLessonTo, setAddingLessonTo] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      fetchCourses();
    }
  }, [navigate]);

  const fetchCourses = async () => {
    try {
      const res = await API.get('/courses');
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const coursePayload = {
        ...formData,
        description: 'Premium course content provided by the instructor.',
        category: 'Technology'
      };

      if (editingId) {
        await API.put(`/courses/${editingId}`, coursePayload);
        alert('Course Updated Successfully! ✏️');
      } else {
        await API.post('/courses', coursePayload);
        alert('Course Created Successfully! 🚀');
      }
      setFormData({ title: '', price: '', seats: '' });
      setEditingId(null);
      fetchCourses();
    } catch (err) {
      console.error(err);
      alert(editingId ? 'Failed to update course' : 'Failed to create course');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await API.delete(`/courses/${id}`);
        alert('Course Deleted! 🗑️');
        fetchCourses();
      } catch (err) {
        alert('Failed to delete course');
      }
    }
  };

  // --- ADD LESSON LOGIC ---
  const handleAddLesson = async (e) => {
  e.preventDefault();
  
  // Check karo ke ID empty toh nahi
  if (!addingLessonTo) {
    alert("Course ID missing!");
    return;
  }

  try {
    const res = await API.post(`/courses/${addingLessonTo}/lessons`, lessonData);
    
    alert('Lesson Added Successfully! 📖');
    setLessonData({ title: '', content: '' });
    setAddingLessonTo(null);
    fetchCourses(); // List refresh karo
  } catch (err) {
    // Ye alert aapko exact reason bataye ga
    console.error("Lesson Error:", err.response?.data);
    alert('Failed: ' + (err.response?.data?.message || 'Check Console'));
  }
};

  const handleEdit = (course) => {
    setFormData({ title: course.title, price: course.price, seats: course.seats });
    setEditingId(course._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewStudents = async (courseId) => {
    if (viewingCourseId === courseId) {
      setViewingCourseId(null);
      return;
    }
    try {
      const res = await API.get(`/enrollments/course/${courseId}`);
      setEnrolledStudents(res.data);
      setViewingCourseId(courseId);
    } catch (err) {
      alert('Failed to fetch students. Ensure backend route exists!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const btnStyle = { padding: '8px 12px', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer', fontWeight: '600', fontSize: '13px' };

  return (
    <div className="sf-dashboard-page">
      <nav className="sf-dash-nav">
        <div className="sf-dash-brand">🎓 SkillForge Hub</div>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </nav>

      <div className="sf-container">
        <div className="sf-welcome-banner">
          <div className="sf-welcome-text">
            <h1>Welcome back, Instructor!</h1>
            <p>Manage your courses, track students, and update content.</p>
          </div>
          <div className="sf-role-badge">⭐ Instructor Panel</div>
        </div>

        <div className="sf-dash-layout">
          
          {/* Left Side: Form */}
          <div className="sf-dash-sidebar">
            <h2 style={{marginBottom: '20px'}}>{editingId ? '✏️ Edit Course' : '➕ Create Course'}</h2>
            <form onSubmit={handleSubmit}>
              <label className="sf-auth-label">Course Title</label>
              <input type="text" className="sf-auth-input" placeholder="e.g. Advanced MERN Stack" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />

              <label className="sf-auth-label">Price ($)</label>
              <input type="number" className="sf-auth-input" placeholder="e.g. 49" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />

              <label className="sf-auth-label">Available Seats</label>
              <input type="number" className="sf-auth-input" placeholder="e.g. 100" value={formData.seats} onChange={(e) => setFormData({...formData, seats: e.target.value})} required />

              <button type="submit" className="btn-primary-sf" style={{width: '100%', justifyContent: 'center', background: editingId ? '#F5A623' : 'var(--primary)'}}>
                {editingId ? 'Update Course' : 'Publish Course'}
              </button>
              
              {editingId && (
                <button type="button" onClick={() => {setEditingId(null); setFormData({title: '', price: '', seats: ''})}} style={{...btnStyle, background: '#888', width: '100%', marginTop: '10px', padding: '12px'}}>
                  Cancel Edit
                </button>
              )}
            </form>
          </div>

          {/* Right Side: Courses & Students */}
          <div className="sf-dash-main">
            <h2 style={{marginBottom: '20px'}}>Your Published Courses</h2>
            
            {courses.length === 0 ? (
              <p>You haven't published any courses yet.</p>
            ) : (
              courses.map(course => (
                <div key={course._id} style={{marginBottom: '20px'}}>
                  <div className="sf-dash-card" style={{marginBottom: '0', borderRadius: (viewingCourseId === course._id || addingLessonTo === course._id) ? '16px 16px 0 0' : '16px'}}>
                    <div className="sf-dash-card-info">
                      <h3>{course.title}</h3>
                      <p>Seats: {course.seats} • Price: <strong style={{color: 'var(--primary)'}}>${course.price}</strong></p>
                    </div>
                    
                    <div style={{display: 'flex', gap: '8px'}}>
                      <button onClick={() => setAddingLessonTo(addingLessonTo === course._id ? null : course._id)} style={{...btnStyle, background: '#28a745'}}>+ Lesson</button>
                      <button onClick={() => handleViewStudents(course._id)} style={{...btnStyle, background: '#1A1A2E'}}>👥 Students</button>
                      <button onClick={() => handleEdit(course)} style={{...btnStyle, background: '#F5A623'}}>✏️</button>
                      <button onClick={() => handleDelete(course._id)} style={{...btnStyle, background: '#D32F2F'}}>🗑️</button>
                    </div>
                  </div>

                  {/* LESSON UPLOAD FORM (DYNAMIC) */}
                  {addingLessonTo === course._id && (
                    <div style={{background: '#f9f9f9', padding: '20px', borderRadius: '0 0 16px 16px', border: '1px dashed #28a745', borderTop: 'none'}}>
                      <h4 style={{marginBottom: '10px'}}>Add Lesson to: {course.title}</h4>
                      <form onSubmit={handleAddLesson}>
                        <input 
                          type="text" className="sf-auth-input" placeholder="Lesson Title" 
                          value={lessonData.title} onChange={(e) => setLessonData({...lessonData, title: e.target.value})} required 
                        />
                        <textarea 
                          className="sf-auth-input" placeholder="Content or Video Link" 
                          style={{minHeight: '60px'}} value={lessonData.content}
                          onChange={(e) => setLessonData({...lessonData, content: e.target.value})}
                        ></textarea>
                        <button type="submit" className="btn-primary-sf" style={{width: '100%', background: '#28a745'}}>Save Lesson</button>
                      </form>
                    </div>
                  )}

                  {/* STUDENTS LIST DROPDOWN */}
                  {viewingCourseId === course._id && (
                    <div style={{background: '#fff', padding: '20px', borderRadius: '0 0 16px 16px', borderTop: '1px solid #eee', boxShadow: '0 10px 30px rgba(0,0,0,0.03)'}}>
                      <h4 style={{marginTop: '0', color: 'var(--text-heading)'}}>Enrolled Students ({enrolledStudents.length})</h4>
                      {enrolledStudents.length === 0 ? (
                        <p style={{color: '#888', fontSize: '14px'}}>No students enrolled yet.</p>
                      ) : (
                        <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
                          {enrolledStudents.map((enrollment, idx) => (
                            <li key={idx} style={{padding: '10px 0', borderBottom: '1px solid #eee', fontSize: '15px'}}>
                              <strong>{enrollment.student?.name || 'Unknown Student'}</strong> <span style={{color: '#888'}}>({enrollment.student?.email || 'N/A'})</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;