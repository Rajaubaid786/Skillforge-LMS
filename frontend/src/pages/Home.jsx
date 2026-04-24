import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Home = () => {
  const [scrolled, setScrolled] = useState(false);

  // Navbar shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to Courses Function
  const handleSearchClick = () => {
    const courseSection = document.getElementById('courses');
    if (courseSection) {
      courseSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="top"> {/* Added ID for Home button to scroll to top */}
      
      {/* --- NAVBAR --- */}
      <nav className={`sf-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="sf-container w-100 d-flex justify-content-between align-items-center">
          <Link to="/" className="sf-brand">
            🎓 SkillForge
          </Link>
          <div className="sf-nav-links d-none d-md-flex">
            <a href="#top">Home</a> {/* Fixed Home Link */}
            <a href="#about">About</a>
            <a href="#courses">Courses</a>
            {/* Added an alert for Blog since we don't have that section yet */}
            <a href="#!" onClick={(e) => { e.preventDefault(); alert('Blog section is coming soon!'); }}>Blog</a>
          </div>
          <Link to="/login" className="btn-primary-sf">
            Get In Touch <span>→</span>
          </Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="sf-hero">
        <div className="sf-container sf-hero-content">
          <div className="sf-hero-text">
            <h1>Build Your Future,<br/>Choose Your Course</h1>
            <p>
              Presenting SkillForge, the tech and business academy of the future. 
              Master the MERN stack, conquer Amazon FBA, and learn the skills to be prepared for tomorrow.
            </p>
            <div className="sf-search-bar">
              <input type="text" placeholder="Search for Web Dev, Amazon FBA..." />
              <button onClick={handleSearchClick}>Search</button> {/* Fixed Search Button */}
            </div>
          </div>
          <div className="sf-hero-visual">
            <div className="sf-hero-circle"></div>
            {/* Yahan placeholder ki jagah actual image tag dalo */}
  <div className="sf-image-placeholder" style={{ background: 'none' }}> 
    <img 
      src="/hero-img.png" 
      alt="Student" 
      style={{ 
        width: '100%', 
        height: '100%', 
        objectFit: 'contain',
        zIndex: 2,
        position: 'relative'
      }} 
    />
  </div>
            <div className="sf-floating-badge">
              <span className="star-icon">★★★★★</span>
              4.8 · 15k+ Reviews
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURE ICONS ROW --- */}
      <section className="sf-features">
        <div className="sf-container sf-features-grid">
          <div className="sf-feature-card">
            <div className="sf-feature-icon">
              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
            </div>
            <div className="sf-feature-text">
              <h4>Video Training</h4>
              <p>With Unlimited Courses</p>
            </div>
          </div>
          <div className="sf-feature-card">
            <div className="sf-feature-icon">
              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>
            </div>
            <div className="sf-feature-text">
              <h4>Versatile Course</h4>
              <p>With Unlimited Courses</p>
            </div>
          </div>
          <div className="sf-feature-card">
            <div className="sf-feature-icon">
              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            </div>
            <div className="sf-feature-text">
              <h4>Expert Teacher</h4>
              <p>With Unlimited Courses</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section className="sf-about" id="about">
        <div className="sf-container sf-about-content">
          <div className="sf-about-visual">
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop" 
              alt="Student in library" 
              className="sf-about-img"
            />
            <div className="sf-about-badge">
              <span className="sf-badge-red">New</span>
              <span>Get 20% off in every course</span>
            </div>
          </div>
          <div className="sf-about-text">
            <span className="sf-section-label">About Us</span>
            <h2>About Our Next Level E-Course For Everyone</h2>
            <p>
              E-learning allows learners to access course materials and complete assignments at their own pace and on their own schedule. This is particularly beneficial for adult learners focusing on Tech and Amazon businesses.
            </p>
            <ul className="sf-about-list">
              <li>
                <div className="sf-list-icon">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                </div>
                Create Account
              </li>
              <li>
                <div className="sf-list-icon">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                </div>
                E-learning eliminates the need for classroom
              </li>
            </ul>
            <Link to="/login" className="btn-primary-sf">
              Explore More <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* --- STATS BANNER --- */}
      <div className="sf-container">
        <section className="sf-stats">
          <div className="sf-stats-content" style={{padding: '0 60px'}}>
            <div className="sf-stats-text">
              <h2>Join Over 5,000 Students From Around The World</h2>
              <p>Learning allows learners to access course materials and complete assignments at their own pace and on their own schedule. This is particularly beneficial for adult learners.</p>
              <Link to="/login" className="btn-primary-sf">
                Join Network <span>→</span>
              </Link>
            </div>
            <div className="sf-stats-visual">
              <img 
                src="https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=800&auto=format&fit=crop" 
                alt="Student group" 
                className="sf-stats-img"
              />
            </div>
          </div>
        </section>
      </div>

      {/* --- TRENDING COURSES GRID --- */}
      <section className="sf-courses" id="courses">
        <div className="sf-container">
          <div className="text-center sf-courses-header">
            <span className="sf-section-label">Course List</span>
            <h2>We Arrange Learning<br/>Events & Courses For Students</h2>
          </div>

          <div className="sf-course-grid">
            
            <div className="sf-course-card">
              <div className="sf-course-img-wrapper">
                <span className="sf-course-badge-overlay">Best Seller</span>
                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop" alt="MERN Stack" />
              </div>
              <div className="sf-course-body">
                <div className="sf-course-meta">
                  <span>Software Dev</span> • <span className="star">★ 4.9</span>
                </div>
                <h3>Complete MERN Stack Mastery 2026</h3>
                <div className="sf-course-footer">
                  <span className="sf-course-price">$49</span>
                  <Link to="/login" className="sf-course-link">Enroll Now →</Link>
                </div>
              </div>
            </div>

            <div className="sf-course-card">
              <div className="sf-course-img-wrapper">
                <span className="sf-course-badge-overlay" style={{background: '#F5A623'}}>Trending</span>
                <img src="https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=600&auto=format&fit=crop" alt="Amazon FBA" />
              </div>
              <div className="sf-course-body">
                <div className="sf-course-meta">
                  <span>E-commerce</span> • <span className="star">★ 4.8</span>
                </div>
                <h3>Amazon FBA: Build a 6-Figure Business</h3>
                <div className="sf-course-footer">
                  <span className="sf-course-price">$1,000</span>
                  <Link to="/login" className="sf-course-link">Enroll Now →</Link>
                </div>
              </div>
            </div>

            <div className="sf-course-card">
              <div className="sf-course-img-wrapper">
                <span className="sf-course-badge-overlay">Hot</span>
                <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop" alt="Cybersecurity" />
              </div>
              <div className="sf-course-body">
                <div className="sf-course-meta">
                  <span>Cybersecurity</span> • <span className="star">★ 5.0</span>
                </div>
                <h3>Ethical Hacking & Penetration Testing</h3>
                <div className="sf-course-footer">
                  <span className="sf-course-price">$99</span>
                  <Link to="/login" className="sf-course-link">Enroll Now →</Link>
                </div>
              </div>
            </div>

            <div className="sf-course-card">
              <div className="sf-course-img-wrapper">
                <span className="sf-course-badge-overlay" style={{background: '#1A1A2E'}}>Future</span>
                <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format&fit=crop" alt="Artificial Intelligence" />
              </div>
              <div className="sf-course-body">
                <div className="sf-course-meta">
                  <span>AI & Machine Learning</span> • <span className="star">★ 4.9</span>
                </div>
                <h3>Applied AI: ChatGPT Prompt Engineering</h3>
                <div className="sf-course-footer">
                  <span className="sf-course-price">$149</span>
                  <Link to="/login" className="sf-course-link">Enroll Now →</Link>
                </div>
              </div>
            </div>

            <div className="sf-course-card">
              <div className="sf-course-img-wrapper">
                <span className="sf-course-badge-overlay">Popular</span>
                <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop" alt="UI/UX Design" />
              </div>
              <div className="sf-course-body">
                <div className="sf-course-meta">
                  <span>Design</span> • <span className="star">★ 4.7</span>
                </div>
                <h3>UI/UX Design: From Figma to Webflow</h3>
                <div className="sf-course-footer">
                  <span className="sf-course-price">$75</span>
                  <Link to="/login" className="sf-course-link">Enroll Now →</Link>
                </div>
              </div>
            </div>

            <div className="sf-course-card">
              <div className="sf-course-img-wrapper">
                <span className="sf-course-badge-overlay" style={{background: '#28a745'}}>Growth</span>
                <img src="https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=600&auto=format&fit=crop" alt="Freelancing" />
              </div>
              <div className="sf-course-body">
                <div className="sf-course-meta">
                  <span>Business</span> • <span className="star">★ 4.9</span>
                </div>
                <h3>Upwork Mastery: Land Premium Clients</h3>
                <div className="sf-course-footer">
                  <span className="sf-course-price">$29</span>
                  <Link to="/login" className="sf-course-link">Enroll Now →</Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section className="sf-testimonials">
        <div className="sf-container">
          <div className="text-center sf-courses-header">
            <span className="sf-section-label">Testimonial</span>
            <h2>What Our Students Say<br/>About Us</h2>
          </div>

          <div className="sf-testimonials-grid">
            <div className="sf-testi-card">
              <div className="sf-testi-header">
                <div className="sf-avatar">
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop" alt="Student" />
                </div>
                <div className="sf-testi-meta">
                  <h4>Ahmed Khan</h4>
                  <p>MERN Stack Developer</p>
                </div>
              </div>
              <div className="sf-stars">★★★★★</div>
              <p className="sf-testi-quote">"Best platform ever! The MERN stack course helped me build real-world projects. I landed a junior dev job within 3 months of completing the course."</p>
            </div>

            <div className="sf-testi-card">
              <div className="sf-testi-header">
                <div className="sf-avatar">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" alt="Student" />
                </div>
                <div className="sf-testi-meta">
                  <h4>Sara Ali</h4>
                  <p>Amazon FBA Expert</p>
                </div>
              </div>
              <div className="sf-stars">★★★★★</div>
              <p className="sf-testi-quote">"The Amazon FBA training is next level. The instructor explained the wholesale model so clearly that I launched my first product successfully."</p>
            </div>

            <div className="sf-testi-card">
              <div className="sf-testi-header">
                <div className="sf-avatar">
                  <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop" alt="Student" />
                </div>
                <div className="sf-testi-meta">
                  <h4>Hamza Tariq</h4>
                  <p>Cybersecurity Analyst</p>
                </div>
              </div>
              <div className="sf-stars">★★★★★</div>
              <p className="sf-testi-quote">"As an ethical hacking student, I found the labs to be extremely practical. The UI of SkillForge is super clean, making learning distraction-free."</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- AESTHETIC DARK FOOTER --- */}
      <footer className="sf-footer">
        <div className="sf-container">
          
          <div className="sf-newsletter-wrapper">
            <div className="sf-newsletter-text">
              <h3>Start Your Learning Journey Today!</h3>
              <p>Join 15,000+ students and get exclusive course offers and tech insights.</p>
            </div>
            <div className="sf-newsletter-form">
              <input type="email" placeholder="Enter your email address..." />
              <button>Subscribe</button>
            </div>
          </div>

          <div className="sf-footer-grid">
            <div>
              <Link to="/" className="sf-footer-brand">🎓 SkillForge</Link>
              <p className="sf-footer-tagline">Empowering the next generation of developers and entrepreneurs with world-class education.</p>
              <div className="sf-socials">
                <a href="#" className="sf-social-icon"><svg width="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.56c-.88.39-1.83.65-2.83.77 1.02-.61 1.8-1.58 2.17-2.72-.95.56-2 .97-3.13 1.19-.9-.96-2.18-1.56-3.59-1.56-2.72 0-4.92 2.2-4.92 4.92 0 .39.04.76.13 1.12C7.69 8.09 4.07 6.13 1.64 3.16c-.42.73-.66 1.57-.66 2.47 0 1.71.87 3.22 2.19 4.1-.8-.03-1.56-.25-2.22-.61v.06c0 2.38 1.69 4.36 3.94 4.81-.41.11-.85.17-1.3.17-.32 0-.62-.03-.92-.09.62 1.95 2.44 3.37 4.59 3.41-1.68 1.32-3.8 2.11-6.12 2.11-.4 0-.79-.02-1.17-.07 2.18 1.4 4.76 2.21 7.55 2.21 9.06 0 14.01-7.51 14.01-14.01 0-.21 0-.42-.02-.63.96-.69 1.8-1.56 2.46-2.55z"/></svg></a>
                <a href="#" className="sf-social-icon"><svg width="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.86 3.9 2.31 7.15 2.16c1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 2.69.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07 3.26 0 3.67-.01 4.95-.07 4.36-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.36-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm7.84-11.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/></svg></a>
                <a href="#" className="sf-social-icon"><svg width="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm13.5 12.27h-3v-5.6c0-3.37-4-3.11-4 0v5.6h-3v-11h3v1.76c1.39-2.58 7-2.78 7 2.47v6.77z"/></svg></a>
              </div>
            </div>

            <div>
              <h4>Academic Info</h4>
              <ul>
                <li><a href="#top">Home</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#courses">Courses</a></li>
                <li><a href="#!" onClick={(e) => { e.preventDefault(); alert('Blog coming soon!'); }}>Blog</a></li>
              </ul>
            </div>

            <div>
              <h4>Categories</h4>
              <ul>
                <li><a href="#courses">Web Development</a></li>
                <li><a href="#courses">Amazon FBA</a></li>
                <li><a href="#courses">Cybersecurity</a></li>
                <li><a href="#courses">UI/UX Design</a></li>
              </ul>
            </div>

            <div>
              <h4>Contact Info</h4>
              <ul>
                <li>📍 512/F, Jhelum, Punjab, Pakistan</li>
                <li>✉️ contact@skillforge.com</li>
                <li>📞 +92 300 1234567</li>
              </ul>
            </div>
          </div>

          <div className="sf-footer-bottom">
            <div>© 2026 SkillForge Education. Crafted with ❤️ for Students.</div>
            <div className="sf-footer-bottom-links">
              <a href="#!">Terms</a>
              <a href="#!">Privacy</a>
              <a href="#!">Help Center</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;