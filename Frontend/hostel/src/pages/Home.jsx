import { Link } from "react-router-dom";
import hostelImg from "../assets/hostel.jpg";
import { FaHome, FaUsers, FaMoneyBill, FaTools, FaChartBar, FaChartLine } from "react-icons/fa";



function Home() {
  return (
    <div>

      {/* ================= HEADER ================= */}
      <header className="header">
        <h2>🏠 Hostel Management System</h2>
        <div>
       <Link to="/admin/login" className="btn btn-light">Admin Login</Link>
        <Link to="/student/login" className="btn btn-outline">Student Login</Link>
        </div>
      </header>

      {/* ================= HERO (WITH IMAGE) ================= */}
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${hostelImg})`
        }}
      >
        <h1>Manage Your Hostel Smartly</h1>
        <p>
          All-in-one platform to manage rooms, tenants, payments, and maintenance.
        </p>
        <Link to="/admin/login" className="btn primary">Get Started</Link>
      </section>

      {/* ================= FEATURES ================= */}
<section className="section">
  <h2 className="section-title">✨ Features</h2>

  <div className="features-grid">
    <FeatureCard
  icon={<FaHome />}
  title="Room Management"
  desc="Track room availability, occupancy status, and room details in real time."
/>

<FeatureCard
  icon={<FaUsers />}
  title="Tenant Management"
  desc="Store and manage tenant information securely with room assignment."
/>

<FeatureCard
  icon={<FaMoneyBill />}
  title="Payment Tracking"
  desc="Monitor rent payments, deposits, pending and overdue amounts."
/>

<FeatureCard
  icon={<FaTools />}
  title="Maintenance Requests"
  desc="Handle maintenance complaints efficiently with status tracking."
/>

<FeatureCard
  icon={<FaChartBar />}
  title="Expense Management"
  desc="Track monthly expenses like electricity, staff, and repairs."
/>

<FeatureCard
  icon={<FaChartLine />}
  title="Reports & Analytics"
  desc="Get insights on revenue, occupancy, and overall performance."
/>

  </div>
</section>


      {/* ================= HOW IT WORKS ================= */}
<section className="section light how-section">
  <h2 className="section-title">⚙️ How It Works</h2>

  <div className="steps-container">
    <Step
      number="1"
      title="Admin Login"
      desc="Admin logs in securely using authorized credentials."
    />
    <Step
      number="2"
      title="Add Rooms"
      desc="Admin adds rooms with rent, floor, and amenities."
    />
    <Step
      number="3"
      title="Add Tenants"
      desc="Tenants are added and assigned to rooms."
    />
    <Step
      number="4"
      title="Manage Everything"
      desc="Payments, maintenance, expenses, and reports are managed."
    />
  </div>
</section>

      {/* ================= FAQ ================= */}
      <section className="section">
        <h2>❓ FAQ</h2>
        <div className="faq">
          <div className="faq-card">
            <b>Who can access admin panel?</b>
            <p>Only authorized admins.</p>
          </div>
          <div className="faq-card">
            <b>Can students see others data?</b>
            <p>No, students can see only their own data.</p>
          </div>
          <div className="faq-card">
            <b>Is data secure?</b>
            <p>Yes, authentication and role-based access is used.</p>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer-advanced">
  <div className="footer-grid">

    <div>
      <h4>Contact Information</h4>
      <p>Email: cdacblr@gmail.com</p>
      <p>Phone: +91-9284404447</p>
    </div>

    <div>
      <h4>Company</h4>
      <p>About</p>
      <p>How it works</p>
      <p>Refer a Friend</p>
      <p>Universities</p>
      <p>Careers</p>
    </div>

    <div>
      <h4>Support</h4>
      <p>Help Center</p>
      <p>Contact</p>
      <p>T&C</p>
      <p>Privacy Policy</p>
      <p>Sitemap</p>
    </div>

    <div>
      <h4>Contact Us</h4>
      <button className="social-btn">WhatsApp</button>
      <button className="social-btn">Instagram</button>
      <button className="social-btn">Twitter</button>
      <button className="social-btn">Facebook</button>
    </div>

  </div>

  <p className="footer-bottom">
    © 2025 Hostel Management System | Simple | Secure | Reliable
  </p>
</footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}


function Step({ number, title, desc }) {
  return (
    <div className="step-card">
      <div className="step-left">
        <div className="step-number">{number}</div>
      </div>

      <div className="step-content">
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>
    </div>
  );
}




export default Home;
