-- Cornell Club Compass
-- Database Schema

CREATE TABLE clubs (
    club_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    time_commitment VARCHAR(50),
    website_url TEXT,
    source_url TEXT,
    source_type VARCHAR(50)
);

CREATE TABLE club_interests (
    club_id INTEGER REFERENCES clubs(club_id),
    interest VARCHAR(100) NOT NULL,
    PRIMARY KEY (club_id, interest)
);

CREATE TABLE club_career_focus (
    club_id INTEGER REFERENCES clubs(club_id),
    career_area VARCHAR(100) NOT NULL,
    PRIMARY KEY (club_id, career_area)
);

CREATE TABLE recruitment (
    recruitment_id SERIAL PRIMARY KEY,
    club_id INTEGER NOT NULL REFERENCES clubs(club_id),
    application_required BOOLEAN,
    interview_required BOOLEAN,
    coffee_chat BOOLEAN,
    info_session BOOLEAN,
    number_of_rounds INTEGER,
    application_open DATE,
    application_deadline DATE
);

CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    club_id INTEGER REFERENCES clubs(club_id),
    event_name VARCHAR(255) NOT NULL,
    event_type VARCHAR(100),
    event_date TIMESTAMP,
    location VARCHAR(255),
    source_url TEXT
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    time_commitment VARCHAR(50),
    club_type_preference VARCHAR(50),
    recruitment_preference VARCHAR(50),
    experience_level VARCHAR(50)
);

CREATE TABLE user_interests (
    user_id INTEGER REFERENCES users(user_id),
    interest VARCHAR(100) NOT NULL,
    PRIMARY KEY (user_id, interest)
);

CREATE TABLE user_goals (
    user_id INTEGER REFERENCES users(user_id),
    goal VARCHAR(100) NOT NULL,
    PRIMARY KEY (user_id, goal)
);

CREATE TABLE saved_clubs (
    user_id INTEGER REFERENCES users(user_id),
    club_id INTEGER REFERENCES clubs(club_id),
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, club_id)
);

CREATE TABLE club_feedback (
    feedback_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    club_id INTEGER REFERENCES clubs(club_id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);