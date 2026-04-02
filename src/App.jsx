import { useState } from "react";
import axios from "axios";
import {
  FaArrowRight,
  FaBath,
  FaBed,
  FaBolt,
  FaBuilding,
  FaCheckCircle,
  FaClipboardList,
  FaDraftingCompass,
  FaEnvelope,
  FaExclamationCircle,
  FaFacebookF,
  FaInstagram,
  FaLayerGroup,
  FaLinkedinIn,
  FaMagic,
  FaMapMarkedAlt,
  FaRulerCombined,
  FaTools,
  FaTwitter,
} from "react-icons/fa";

function App() {
  const [formData, setFormData] = useState({
    plotSize: "",
    bedrooms: "",
    bathrooms: "",
    floors: "",
    features: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const sectionTitles = [
    "Project Summary",
    "Suggested Room Layout",
    "Suggested Room Dimensions",
    "Structural / Design Notes",
    "Disclaimer",
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await axios.post(
        "https://hotel-yfu8.onrender.com/api/generate-plan",
        {
          plotSize: formData.plotSize,
          bedrooms: formData.bedrooms,
          bathrooms: formData.bathrooms,
          floors: formData.floors,
          features: formData.features
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
          notes: formData.notes,
        }
      );

      setResult(response.data.result || "");
    } catch (err) {
      console.error(err);
      setError("Failed to generate plan. Make sure your backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const getSection = (title) => {
    if (!result) return "";

    const currentIndex = sectionTitles.indexOf(title);
    if (currentIndex === -1) return "";

    const start = result.indexOf(title);
    if (start === -1) return "";

    const nextTitle = sectionTitles[currentIndex + 1];
    const end = nextTitle ? result.indexOf(nextTitle) : result.length;

    return result
      .slice(start + title.length, end === -1 ? result.length : end)
      .trim();
  };

  const renderLines = (text) => {
    if (!text) return <p>No content yet.</p>;

    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    return lines.map((line, index) => {
      const cleanLine = line.replace(/^-+\s*/, "");
      const isBullet = line.startsWith("-");

      if (isBullet) {
        return (
          <div className="line-item bullet-line" key={index}>
            <span className="bullet-dot"></span>
            <p>{cleanLine}</p>
          </div>
        );
      }

      return (
        <div className="line-item" key={index}>
          <p>{line}</p>
        </div>
      );
    });
  };

  return (
    <div className="app-shell">
      <div className="bg-grid"></div>

      <header className="site-header">
        <div className="container nav-wrap">
          <div className="logo-wrap">
            <div className="logo-icon">
              <FaDraftingCompass />
            </div>
            <div>
              <h2>CivilPlan AI</h2>
              <span>Smart Engineering Concepts</span>
            </div>
          </div>

          <nav className="nav-links">
            <a href="#home">Home</a>
            <a href="#planner">Planner</a>
            <a href="#features">Features</a>
            <a href="#contact">Contact</a>
          </nav>

          <a href="#planner" className="header-btn">
            Generate Plan
          </a>
        </div>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="container hero-grid">
            <div className="hero-left">
              <div className="hero-badge">
                <FaBolt />
                <span>AI-assisted concept planning for civil engineers</span>
              </div>

              <h1>
                Generate conceptual floor plans and design notes in minutes
              </h1>

              <p className="hero-text">
                CivilPlan AI helps engineers, architects, and planners turn
                simple project inputs into professional conceptual planning
                outputs with room layouts, dimensions, and structural notes.
              </p>

              <div className="hero-actions">
                <a href="#planner" className="primary-btn">
                  Start Planning <FaArrowRight />
                </a>
                <a href="#features" className="secondary-btn">
                  Explore Features
                </a>
              </div>

              <div className="hero-stats">
                <div className="stat-card">
                  <h3>Fast</h3>
                  <p>Generate planning ideas quickly</p>
                </div>
                <div className="stat-card">
                  <h3>Clean</h3>
                  <p>Professional result structure</p>
                </div>
                <div className="stat-card">
                  <h3>Practical</h3>
                  <p>Useful for client demos and concept work</p>
                </div>
              </div>
            </div>

            <div className="hero-right">
              <div className="preview-card">
                <div className="preview-top">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>

                <div className="preview-content">
                  <div className="preview-mini-card">
                    <h4>Project Input</h4>
                    <div className="preview-lines">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>

                  <div className="preview-mini-card glow-card">
                    <h4>AI Output</h4>
                    <div className="preview-lines">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>

                  <div className="preview-mini-row">
                    <div className="preview-chip">Room Layout</div>
                    <div className="preview-chip">Dimensions</div>
                    <div className="preview-chip">Notes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="planner-section" id="planner">
          <div className="container">
            <div className="section-heading">
              <p className="mini-title">Planner Dashboard</p>
              <h2>Input your project details and generate a concept instantly</h2>
            </div>

            <div className="planner-grid">
              <div className="planner-form-card glass-card">
                <div className="card-top">
                  <h3>Project Input</h3>
                  <p>Fill in the requirements for your building concept.</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="input-group">
                    <label>Plot Size</label>
                    <div className="input-wrap">
                      <FaBuilding />
                      <input
                        type="text"
                        name="plotSize"
                        placeholder="e.g. 50x100 ft"
                        value={formData.plotSize}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="double-grid">
                    <div className="input-group">
                      <label>Bedrooms</label>
                      <div className="input-wrap">
                        <FaBed />
                        <input
                          type="number"
                          name="bedrooms"
                          placeholder="3"
                          value={formData.bedrooms}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="input-group">
                      <label>Bathrooms</label>
                      <div className="input-wrap">
                        <FaBath />
                        <input
                          type="number"
                          name="bathrooms"
                          placeholder="2"
                          value={formData.bathrooms}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Floors</label>
                    <div className="input-wrap">
                      <FaLayerGroup />
                      <input
                        type="number"
                        name="floors"
                        placeholder="1"
                        value={formData.floors}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Features</label>
                    <div className="input-wrap">
                      <FaMagic />
                      <input
                        type="text"
                        name="features"
                        placeholder="Kitchen, Parking, Dining"
                        value={formData.features}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Extra Notes</label>
                    <textarea
                      name="notes"
                      rows="5"
                      placeholder="Modern bungalow with good ventilation and natural light"
                      value={formData.notes}
                      onChange={handleChange}
                    />
                  </div>

                  <button className="submit-btn" type="submit" disabled={loading}>
                    {loading ? "Generating..." : "Generate Plan"}
                  </button>

                  {error && <p className="error-text">{error}</p>}
                </form>
              </div>

              <div className="planner-result-card glass-card">
                <div className="card-top">
                  <h3>Generated Output</h3>
                  <p>AI-generated concept summary, dimensions, and notes.</p>
                </div>

                {!result && !loading && (
                  <div className="empty-box">
                    <FaClipboardList />
                    <h4>No generated plan yet</h4>
                    <p>
                      Your project summary, room layout, dimensions, and design
                      notes will appear here.
                    </p>
                  </div>
                )}

                {loading && (
                  <div className="empty-box">
                    <div className="loader"></div>
                    <h4>Generating concept...</h4>
                    <p>Please wait while CivilPlan AI prepares your result.</p>
                  </div>
                )}

                {result && (
                  <div className="result-sections">
                    <div className="result-panel">
                      <h4>
                        <FaClipboardList /> Project Summary
                      </h4>
                      <div className="section-content">
                        {renderLines(getSection("Project Summary"))}
                      </div>
                    </div>

                    <div className="result-panel">
                      <h4>
                        <FaMapMarkedAlt /> Suggested Room Layout
                      </h4>
                      <div className="section-content">
                        {renderLines(getSection("Suggested Room Layout"))}
                      </div>
                    </div>

                    <div className="result-panel">
                      <h4>
                        <FaRulerCombined /> Suggested Room Dimensions
                      </h4>
                      <div className="section-content">
                        {renderLines(getSection("Suggested Room Dimensions"))}
                      </div>
                    </div>

                    <div className="result-panel">
                      <h4>
                        <FaTools /> Structural / Design Notes
                      </h4>
                      <div className="section-content">
                        {renderLines(getSection("Structural / Design Notes"))}
                      </div>
                    </div>

                    <div className="result-panel">
                      <h4>
                        <FaExclamationCircle /> Disclaimer
                      </h4>
                      <div className="section-content">
                        {renderLines(getSection("Disclaimer"))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="features-section" id="features">
          <div className="container">
            <div className="section-heading center">
              <p className="mini-title">Core Features</p>
              <h2>Built for concept-stage planning and polished demos</h2>
            </div>

            <div className="features-grid">
              <div className="feature-card glass-card">
                <FaBuilding />
                <h3>AI Floor Plan Suggestions</h3>
                <p>
                  Turn basic project inputs into clean concept summaries and
                  room arrangement suggestions.
                </p>
              </div>

              <div className="feature-card glass-card">
                <FaRulerCombined />
                <h3>Dimension Recommendations</h3>
                <p>
                  Get approximate room measurements that help guide early
                  planning conversations.
                </p>
              </div>

              <div className="feature-card glass-card">
                <FaTools />
                <h3>Structural Notes</h3>
                <p>
                  Generate practical design guidance and engineering-related
                  considerations quickly.
                </p>
              </div>

              <div className="feature-card glass-card">
                <FaCheckCircle />
                <h3>Professional Output</h3>
                <p>
                  Present results in a polished interface that feels like a real
                  premium SaaS product.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <div className="cta-card glass-card">
              <h2>Ready to generate your next project concept?</h2>
              <p>
                Use CivilPlan AI to create clear concept-stage planning output
                for demos, clients, and internal review.
              </p>
              <a href="#planner" className="primary-btn">
                Generate Now <FaArrowRight />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="logo-wrap">
              <div className="logo-icon">
                <FaDraftingCompass />
              </div>
              <div>
                <h3>CivilPlan AI</h3>
                <span>AI for modern concept planning</span>
              </div>
            </div>
            <p>
              A modern AI-powered interface for civil engineers, architects, and
              construction planners.
            </p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <a href="#home">Home</a>
            <a href="#planner">Planner</a>
            <a href="#features">Features</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer-links">
            <h4>Contact</h4>
            <p>
              <FaEnvelope /> hello@civilplanai.com
            </p>
            <p>Built for polished engineering demos</p>
          </div>

          <div className="footer-socials">
            <h4>Socials</h4>
            <div className="social-icons">
              <a href="/">
                <FaTwitter />
              </a>
              <a href="/">
                <FaLinkedinIn />
              </a>
              <a href="/">
                <FaInstagram />
              </a>
              <a href="/">
                <FaFacebookF />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 CivilPlan AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;