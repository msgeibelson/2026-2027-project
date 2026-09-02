import { useState } from "react";
import "./App.css";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({
    interests: [],
    goals: [],
    club_type: "",
    time_commitment: "",
    recruitment_preference: "",
    experience_level: "",
  });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const questions = [
    {
      key: "interests",
      step: "01",
      question: "What are you interested in?",
      helper: "Select everything that sounds like you.",
      type: "multi",
      options: [
        "Business",
        "Data & Analytics",
        "Technology & Coding",
        "Finance",
        "Healthcare",
        "Engineering",
        "Fashion",
        "Marketing",
        "Entrepreneurship",
        "Consulting",
        "Arts & Culture",
        "Community & Service",
        "Sports & Recreation",
        "Environment & Sustainability",
      ],
    },
    {
      key: "goals",
      step: "02",
      question: "What are you hoping to get from a club?",
      helper: "Select everything that sounds like you.",
      type: "multi",
      options: [
        "Career opportunities",
        "Networking",
        "Build technical skills",
        "Build professional skills",
        "Leadership opportunities",
        "Make friends",
        "Find a community",
        "Affinity",
        "Have fun",
        "Explore a new interest",
        "Get outside",
        "Gain confidence",
      ],
    },
    {
      key: "club_type",
      step: "03",
      question: "What type of club are you looking for?",
      helper: "Choose the type that sounds most like you.",
      type: "single",
      options: [
        "Professional / Career",
        "Academic / Educational",
        "Social / Community",
        "Cultural / Identity",
        "Service / Volunteer",
        "Sports / Recreation",
        "Arts / Creative",
        "Technical / STEM",
        "No preference",
      ],
    },
    {
      key: "time_commitment",
      step: "04",
      question: "How much time do you want to commit?",
      helper: "Choose the option that best fits your schedule.",
      type: "single",
      options: [
        "Very little — I'm looking for something low-commitment",
        "A few hours a week",
        "Moderate commitment — I'm willing to make it a priority",
        "High commitment — I want to be very involved",
        "No preference",
      ],
    },
    {
      key: "recruitment_preference",
      step: "05",
      question: "How do you feel about competitive recruitment?",
      helper: "There's no right answer.",
      type: "single",
      options: [
        "Excited — I love a challenge",
        "Open to it — I'm willing to try",
        "A little nervous — I'd rather know what to expect",
        "Very nervous — I'd prefer something less competitive",
        "Not for me — I want to avoid competitive recruitment",
        "No preference — I'm open to anything",
      ],
    },
    {
      key: "experience_level",
      step: "06",
      question: "What are you looking for in a club?",
      helper: "Choose the option that sounds most like you.",
      type: "single",
      options: [
        "Trying something new",
        "Building skills I already have",
        "Applying my skills to hands-on projects",
        "A mix of all three",
      ],
    },
  ];

  const question = questions[currentQuestion];
  const currentAnswer = answers[question.key];

  function startQuiz() {
    setQuizStarted(true);

    setTimeout(() => {
      document
        .getElementById("quiz")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }

  function selectAnswer(option) {
    if (question.type === "multi") {
      setAnswers((current) => {
        const existing = current[question.key];

        return {
          ...current,
          [question.key]: existing.includes(option)
            ? existing.filter((item) => item !== option)
            : [...existing, option],
        };
      });
    } else {
      setAnswers((current) => ({
        ...current,
        [question.key]: option,
      }));
    }
  }

  function canContinue() {
    if (question.type === "multi") {
      return currentAnswer.length > 0;
    }

    return currentAnswer !== "";
  }

  function goBack() {
    if (currentQuestion > 0) {
      setCurrentQuestion((current) => current - 1);
    }
  }

  async function getRecommendations() {
    setLoading(true);

    try {
      const params = new URLSearchParams();

      if (answers.interests.length > 0) {
        params.set("interests", answers.interests.join(","));
      }

      if (answers.goals.length > 0) {
        params.set("goals", answers.goals.join(","));
      }

      if (answers.club_type) {
        params.set("club_type", answers.club_type);
      }

      if (answers.time_commitment) {
        params.set("time_commitment", answers.time_commitment);
      }

      if (answers.recruitment_preference) {
        params.set(
          "recruitment_preference",
          answers.recruitment_preference
        );
      }

      if (answers.experience_level) {
        params.set("experience_level", answers.experience_level);
      }

      const response = await fetch(
        `https://vigilant-acorn-gx76grg46pwp29q-3000.app.github.dev/api/recommendations?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Failed to get recommendations");
      }

      const data = await response.json();

      setRecommendations(data);

      setTimeout(() => {
        document
          .getElementById("results")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("Error getting recommendations:", error);
    } finally {
      setLoading(false);
    }
  }

  function continueQuiz() {
    if (!canContinue()) return;

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((current) => current + 1);
    } else {
      getRecommendations();
    }
  }

  function restartQuiz() {
    setQuizStarted(false);
    setCurrentQuestion(0);

    setAnswers({
      interests: [],
      goals: [],
      club_type: "",
      time_commitment: "",
      recruitment_preference: "",
      experience_level: "",
    });

    setRecommendations([]);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
        {!quizStarted && recommendations.length === 0 && (
          <section className="hero">
            <p className="eyebrow">CORNELL UNIVERSITY</p>

            <h1>
              Find the clubs that fit <em>you.</em>
            </h1>

            <p className="hero-text">
              With 1,000+ organizations at Cornell, finding the right clubs can
              feel overwhelming. Tell us what you're looking for and we'll help
              you find your best matches.
            </p>

            <button className="primary-button" onClick={startQuiz}>
              Find My Clubs
            </button>
          </section>
        )}

        {quizStarted && recommendations.length === 0 && (
          <section id="quiz" className="quiz-section">
            <div className="quiz-container">
              <div className="quiz-top">
                <span className="quiz-number">
                  {question.step} / 06
                </span>

                <span className="quiz-progress-text">
                  {Math.round(
                    ((currentQuestion + 1) / questions.length) * 100
                  )}
                  %
                </span>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: `${
                      ((currentQuestion + 1) / questions.length) * 100
                    }%`,
                  }}
                />
              </div>

              <div className="quiz-heading">
                <p className="eyebrow">LET'S FIND YOUR FIT</p>

                <h2 key={question.key}>{question.question}</h2>

                <p>{question.helper}</p>
              </div>

              <div
                className={`quiz-options ${
                  question.type === "multi" ? "multi" : "single"
                }`}
              >
                {question.options.map((option) => {
                  const selected =
                    question.type === "multi"
                      ? currentAnswer.includes(option)
                      : currentAnswer === option;

                  return (
                    <button
                      key={option}
                      className={`quiz-option ${
                        selected ? "selected" : ""
                      }`}
                      onClick={() => selectAnswer(option)}
                    >
                      <span className="option-text">{option}</span>

                      <span className="option-check">
                        {selected ? "✓" : ""}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="quiz-actions">
                <button
                  className="back-button"
                  onClick={goBack}
                  disabled={currentQuestion === 0}
                >
                  ← Back
                </button>

                <button
                  className="continue-button"
                  disabled={!canContinue() || loading}
                  onClick={continueQuiz}
                >
                  {loading
                    ? "Finding your matches..."
                    : currentQuestion === questions.length - 1
                      ? "See My Matches →"
                      : "Continue →"}
                </button>
              </div>
            </div>
          </section>
        )}

        {recommendations.length > 0 && (
          <section id="results" className="results-section">
            <div className="results-container">
              <p className="eyebrow">YOUR RESULTS</p>

              <h2>
                Your clubs are <em>out there.</em>
              </h2>

              <p className="results-intro">
                Based on your interests, goals, and preferences, here are your
                top matches.
              </p>

              <div className="recommendation-list">
                {recommendations.map((club, index) => (
                  <div className="recommendation-card" key={club.name}>
                    <div className="match-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="recommendation-info">
                      <h3>{club.name}</h3>

                      <p className="club-category">
                        {club.category}
                      </p>

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

              <button className="secondary-button" onClick={restartQuiz}>
                Retake Quiz
              </button>
            </div>
          </section>
        )}

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