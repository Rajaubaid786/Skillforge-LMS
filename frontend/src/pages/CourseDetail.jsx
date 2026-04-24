import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import '../App.css';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeLesson, setActiveLesson] = useState(null); // Naya state lesson content ke liye
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await API.get(`/courses/${id}`);
        setCourse(res.data);
        // Default: Pehla lesson select kar lo agar maujood hai
        if (res.data.lessons && res.data.lessons.length > 0) {
          setActiveLesson(res.data.lessons[0]);
        }
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

  if (loading) return <div className="sf-container" style={{padding: '50px'}}>Loading Course Content...</div>;
  if (!course) return <div className="sf-container">Course not found.</div>;

  return (
    <div className="sf-dashboard-page">
      <nav className="sf-dash-nav">
        <div className="sf-dash-brand" onClick={() => navigate(-1)} style={{cursor: 'pointer'}}>← Back to Courses</div>
        <button className="btn-primary-sf" onClick={handleEnroll}>Enroll Now</button>
      </nav>

      <div className="sf-container" style={{marginTop: '40px'}}>
        <div className="sf-dash-layout" style={{display: 'flex', gap: '30px'}}>
          
          {/* Left Side: Sidebar for Lessons List */}
          <div className="sf-dash-sidebar" style={{flex: '0 0 300px'}}>
            <div style={{background: 'white', padding: '20px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)'}}>
              <h3 style={{marginBottom: '20px', fontSize: '18px'}}>Course Syllabus 📖</h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                {course.lessons && course.lessons.length > 0 ? (
                  course.lessons.map((lesson, index) => (
                    <div 
                      key={index} 
                      onClick={() => setActiveLesson(lesson)}
                      style={{
                        padding: '15px', 
                        background: activeLesson?.title === lesson.title ? '#FFF0EB' : '#F8F9FA', 
                        borderRadius: '12px', 
                        border: activeLesson?.title === lesson.title ? '1px solid var(--primary)' : '1px solid #eee',
                        cursor: 'pointer',
                        transition: '0.3s'
                      }}
                    >
                      <h4 style={{margin: 0, fontSize: '14px', color: activeLesson?.title === lesson.title ? 'var(--primary)' : '#333'}}>
                        {index + 1}. {lesson.title}
                      </h4>
                    </div>
                  ))
                ) : (
                  <p style={{fontSize: '12px', color: '#999'}}>No lessons available.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: Main Content Viewer */}
          <div className="sf-dash-main" style={{flex: '1'}}>
            <div style={{background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', minHeight: '500px'}}>
              <span className="sf-role-badge" style={{color: 'var(--primary)', marginBottom: '10px', display: 'inline-block'}}>
                {course.category}
              </span>
              <h1 style={{fontSize: '32px', marginBottom: '20px'}}>{course.title}</h1>
              
              <hr style={{margin: '30px 0', border: 'none', borderTop: '1px solid #eee'}} />
              
              {activeLesson ? (
                <div className="lesson-viewer">
                  <h2 style={{color: '#333', marginBottom: '15px'}}>{activeLesson.title}</h2>
                  <div style={{
                    fontSize: '17px', 
                    color: '#555', 
                    lineHeight: '1.8', 
                    background: '#fafafa', 
                    padding: '25px', 
                    borderRadius: '16px',
                    borderLeft: '5px solid var(--primary)'
                  }}>
                    {activeLesson.content}
                  </div>
                </div>
              ) : (
                <div style={{textAlign: 'center', marginTop: '100px'}}>
                  <p style={{color: '#666'}}>Please select a lesson from the sidebar to view content.</p>
                </div>
              )}

              {/* Course Meta Info */}
              <div style={{marginTop: '40px', padding: '20px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <p style={{margin: 0, color: '#888'}}>Instructor: <strong>{course.instructor?.name || 'SkillForge Expert'}</strong></p>
                <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
                    <span style={{fontSize: '24px', fontWeight: 'bold', color: 'var(--primary)'}}>${course.price}</span>
                    <button className="btn-primary-sf" onClick={handleEnroll}>Join Course</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseDetail;