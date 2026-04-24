import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../App.css";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]); // NEW: Enrollments state
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      fetchCourses();
      fetchEnrollments(); // NEW: Initial fetch
    }
  }, [navigate]);

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // NEW: Fetch active enrollments for stats and progress bars
  const fetchEnrollments = async () => {
    try {
      const res = await API.get("/enrollments/my-courses");
      setEnrollments(res.data);
    } catch (err) {
      console.error("Error fetching enrollments", err);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      await API.post(
        "/enrollments",
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("🎉 Successfully Enrolled in Course!");
      fetchEnrollments(); // REFRESH stats after enrollment
    } catch (err) {
      console.error(err);
      alert("❌ Failed to enroll. You might already be enrolled!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <div className="sf-dashboard-page">
      <nav className="sf-dash-nav">
        <div className="sf-dash-brand">🎓 SkillForge Learning</div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button className="btn-secondary-sf" onClick={() => navigate('/profile')}>
            My Profile 👤
          </button>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="sf-container">
        <div className="sf-welcome-banner" style={{ background: "linear-gradient(135deg, #1A1A2E 0%, #E8441A 100%)" }}>
          <div className="sf-welcome-text">
            <h1>Ready to level up your skills?</h1>
            <p>Explore courses, master new technologies, and build your future.</p>
          </div>
          <div className="sf-role-badge">🎓 Student Portal</div>
        </div>

        {/* Stats Row - Now Dynamic */}
        <div className="sf-stats-row">
          <div className="sf-stat-card">
            <div className="sf-stat-icon">📚</div>
            <div className="sf-stat-info">
              <h4>{courses.length}</h4>
              <p>Available Courses</p>
            </div>
          </div>
          <div className="sf-stat-card">
            <div className="sf-stat-icon" style={{ background: "rgba(245, 166, 35, 0.1)", color: "#F5A623" }}>⏳</div>
            <div className="sf-stat-info">
              <h4>{enrollments.length}</h4>
              <p>Active Enrollments</p>
            </div>
          </div>
          <div className="sf-stat-card">
            <div className="sf-stat-icon" style={{ background: "rgba(40, 167, 69, 0.1)", color: "#28a745" }}>🏆</div>
            <div className="sf-stat-info">
              <h4>{enrollments.filter(e => e.progress === 100).length}</h4>
              <p>Completed</p>
            </div>
          </div>
        </div>

        {/* SECTION: My Learning (Enrolled Courses with Progress) */}
        {enrollments.length > 0 && (
          <div style={{ background: "white", padding: "30px", borderRadius: "24px", marginBottom: "30px", boxShadow: "0 10px 40px rgba(0,0,0,0.03)" }}>
            <h2 style={{ marginBottom: "20px" }}>My Learning Progress</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {enrollments.map((item) => (
                <div key={item._id} style={{ padding: "20px", border: "1px solid #eee", borderRadius: "16px" }}>
                  <h4 style={{ margin: "0 0 10px 0" }}>{item.course?.title}</h4>
                  <div style={{ width: '100%', background: '#eee', borderRadius: '10px', height: '8px' }}>
                    <div style={{ width: `${item.progress}%`, background: 'var(--primary)', height: '100%', borderRadius: '10px' }}></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <span style={{ fontSize: '12px', color: '#888' }}>Progress: {item.progress}%</span>
                    <button 
                      style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '600', cursor: 'pointer' }}
                      onClick={() => navigate(`/course/${item.course?._id}`)}
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION: Course Catalog */}
        <div style={{ background: "white", padding: "40px", borderRadius: "24px", boxShadow: "0 10px 40px rgba(0,0,0,0.03)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
            <h2>Explore New Courses</h2>
            <span style={{ color: "var(--primary)", fontWeight: "600", cursor: "pointer" }}>View All →</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px" }}>
            {courses.length === 0 ? (
              <p>No courses available right now.</p>
            ) : (
              courses.map((course) => (
                <div key={course._id} className="sf-course-card" style={{ margin: "0", border: "1px solid #eee", boxShadow: "none" }}>
                  <div className="sf-course-img-wrapper">
                    <span className="sf-course-badge-overlay">Trending</span>
                    <img src={`https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop&sig=${course._id}`} alt="Course" />
                  </div>
                  <div className="sf-course-body">
                    <h3>{course.title}</h3>
                    <p style={{ color: "#888", marginBottom: "16px" }}>Seats: {course.seats}</p>
                    <div className="sf-course-footer">
                      <span className="sf-course-price">${course.price}</span>
                      <button className="btn-secondary-sf" style={{ padding: "10px 15px", fontSize: "13px" }} onClick={() => navigate(`/course/${course._id}`)}>Details</button>
                      <button className="btn-primary-sf" style={{ padding: "10px 15px", fontSize: "13px" }} onClick={() => handleEnroll(course._id)}>Enroll</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;