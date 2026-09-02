import { useState } from "react";
import "./App.css";

function App() {
  const [interests, setInterests] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const interestOptions = [
    "Business",
    "Data",
    "Technology",
    "Finance",
    "Healthcare",
    "Engineering",
    "Marketing",
    "Entrepreneurship",
  ];

  function toggleInterest(interest) {
    setInterests((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest]
    );
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">Cornell Club Compass</div>

        <div className="nav-links">
          <a href="#discover">Discover</a>
          <a href="#recruitment">Recruitment Guide</a>
          <a href="#tracker">My Tracker</a>
        </div>
      </nav>

      <main>
        <section className="hero">
          <p className="eyebrow">CORNELL UNIVERSITY</p>

          <h1>Find the clubs that fit <em>you.</em></h1>

          <p className="hero-text">
            With 1,000+ organizations at Cornell, finding the right clubs can
            feel overwhelming. Tell us what you're looking for and we'll help
            you find your best matches.
          </p>

          <button
  className="primary-button"
  disabled={interests.length === 0}
  onClick={async () => {
    const response = await fetch(
  `https://vigilant-acorn-gx76grg46pwp29q-3000.app.github.dev/api/recommendations?interests=${interests.join(",")}`
);

    const data = await response.json();

setRecommendations(data);
  }}
>
  Find My Matches
</button>
        </section>

        <section id="discover" className="questionnaire">
          <div className="section-heading">
            <p className="eyebrow">STEP 1</p>
            <h2>What are you interested in?</h2>
            <p>Select everything that sounds like you.</p>
          </div>

          <div className="interest-grid">
            {interestOptions.map((interest) => (
              <button
                key={interest}
                className={`interest-button ${
                  interests.includes(interest) ? "selected" : ""
                }`}
                onClick={() => toggleInterest(interest)}
              >
                {interest}
              </button>
            ))}
          </div>

          <p className="selected-count">
            {interests.length} {interests.length === 1 ? "interest" : "interests"} selected
          </p>

          <button
            className="primary-button"
            disabled={interests.length === 0}
            onClick={() => console.log("Selected interests:", interests)}
          >
            Find My Matches
          </button>
          {recommendations.length > 0 && (
  <div className="recommendations">
    <h2>Your Top Club Matches</h2>
    <p>Based on the interests you selected.</p>

    <div className="recommendation-list">
      {recommendations.map((club, index) => (
        <div className="recommendation-card" key={club.name}>
          <div className="match-number">{index + 1}</div>

          <div className="recommendation-info">
            <h3>{club.name}</h3>
            <p className="club-category">{club.category}</p>
            <p>{club.description}</p>

            {club.reasons.length > 0 && (
              <ul>
                {club.reasons.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="match-score">
            {club.score}%
            <span>match</span>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
        </section>

        <section id="recruitment" className="info-section">
          <p className="eyebrow">BEYOND DISCOVERY</p>
          <h2>Make recruitment easier.</h2>

          <div className="feature-grid">
            <div className="feature-card">
              <h3>Recruitment Guide</h3>
              <p>
                Understand applications, interviews, coffee chats, and
                recruitment timelines.
              </p>
            </div>

            <div className="feature-card">
              <h3>Interview Prep</h3>
              <p>
                Prepare for club interviews with practice questions and
                personalized feedback.
              </p>
            </div>

            <div className="feature-card">
              <h3>Recruitment Tracker</h3>
              <p>
                Keep track of deadlines, events, applications, interviews, and
                decisions in one place.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;