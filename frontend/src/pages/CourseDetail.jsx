import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import '../App.css';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await API.get(`/courses/${id}`);
        setCourse(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    try {
      await API.post('/enrollments', { courseId: id });
      alert('🎉 Enrollment Successful!');
      navigate('/student-dashboard');
    } catch (err) {
      alert('Already enrolled or error occurred.');
    }
  };

  if (loading) return <div className="sf-container">Loading...</div>;
  if (!course) return <div className="sf-container">Course not found.</div>;

  return (
    <div className="sf-dashboard-page">
      <nav className="sf-dash-nav">
        <div className="sf-dash-brand" onClick={() => navigate(-1)} style={{cursor: 'pointer'}}>← Back</div>
        <button className="btn-primary-sf" onClick={handleEnroll}>Enroll Now</button>
      </nav>

      <div className="sf-container" style={{marginTop: '40px'}}>
        <div className="sf-dash-layout">
          
          {/* Left Side: Course Info */}
          <div className="sf-dash-main">
            <div style={{background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)'}}>
              <span className="sf-role-badge" style={{color: 'var(--primary)', marginBottom: '20px', display: 'inline-block'}}>
                {course.category}
              </span>
              <h1 style={{fontSize: '42px', marginBottom: '20px'}}>{course.title}</h1>
              <p style={{fontSize: '18px', color: '#666', lineHeight: '1.6'}}>{course.description}</p>
              
              <hr style={{margin: '40px 0', border: 'none', borderTop: '1px solid #eee'}} />
              
              <h3 style={{marginBottom: '20px'}}>Course Lessons 📖</h3>
              {course.lessons && course.lessons.length > 0 ? (
                <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                  {course.lessons.map((lesson, index) => (
                    <div key={index} style={{padding: '20px', background: '#F8F9FA', borderRadius: '12px', border: '1px solid #eee'}}>
                      <h4 style={{margin: 0}}>Lesson {index + 1}: {lesson.title}</h4>
                      <p style={{margin: '10px 0 0 0', color: '#888', fontSize: '14px'}}>{lesson.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{color: '#999', fontStyle: 'italic'}}>No lessons uploaded yet by the instructor.</p>
              )}
            </div>
          </div>

          {/* Right Side: Sidebar Stats */}
          <div className="sf-dash-sidebar" style={{flex: '0 0 30%'}}>
            <div style={{background: 'white', padding: '30px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', textAlign: 'center'}}>
              <h2 style={{color: 'var(--primary)', fontSize: '36px', marginBottom: '10px'}}>${course.price}</h2>
              <p style={{color: '#888', marginBottom: '20px'}}>Instructor: <strong>{course.instructor?.name}</strong></p>
              <button className="btn-primary-sf" style={{width: '100%', justifyContent: 'center', padding: '15px'}} onClick={handleEnroll}>
                Start Learning Now
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseDetail;