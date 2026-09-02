const fs = require("fs");
const path = require("path");

function loadClubs() {
    const filePath = path.join(__dirname, "..", "research", "clubs.json");
    const data = fs.readFileSync(filePath, "utf8");

    return JSON.parse(data);
}

function normalizePreferences(preferences) {
    const normalized = { ...preferences };

    // Club type
    const clubTypeMap = {
        "Professional / Career": "professional",
        "Academic / Educational": "academic",
        "Social / Community": "social",
        "Cultural / Identity": "cultural",
        "Service / Volunteer": "service",
        "Sports / Recreation": "sports",
        "Arts / Creative": "arts",
        "Technical / STEM": "technical",
        "No preference": null
    };

    if (normalized.club_type) {
        normalized.club_type =
            clubTypeMap[normalized.club_type] ||
            normalized.club_type;
    }

    // Recruitment preference
    const recruitmentMap = {
        "Excited — I love a challenge": "competitive",
        "Open to it — I'm willing to try": "competitive",
        "A little nervous — I'd rather know what to expect": "open",
        "Very nervous — I'd prefer something less competitive": "open",
        "Not for me — I want to avoid competitive recruitment": "open",
        "No preference — I'm open to anything": null
    };

    if (normalized.recruitment_preference) {
        normalized.recruitment_preference =
            recruitmentMap[normalized.recruitment_preference] ||
            normalized.recruitment_preference;
    }

    // Experience level
    const experienceMap = {
        "Trying something new": "beginner",
        "Building skills I already have": "some-experience",
        "Applying my skills to hands-on projects": "some-experience",
        "A mix of all three": "some-experience"
    };

    if (normalized.experience_level) {
        normalized.experience_level =
            experienceMap[normalized.experience_level] ||
            normalized.experience_level;
    }

    return normalized;
}

function calculateRecommendationScore(club, preferences) {
    let score = 0;
    const reasons = [];

// INTERESTS — 40%
const userInterests = preferences.interests || [];
const clubInterests = club.interests || [];

const interestMap = {
    "Business": ["business"],
    "Data & Analytics": ["data", "analytics", "data science", "statistics", "machine learning"],
    "Technology & Coding": ["technology", "software", "programming", "computer science", "product design", "mobile development", "algorithms"],
    "Finance": ["finance", "investing"],
    "Healthcare": ["healthcare", "global health"],
    "Engineering": ["engineering"],
    "Fashion": ["fashion"],
    "Marketing": ["marketing"],
    "Entrepreneurship": ["entrepreneurship"],
    "Consulting": ["consulting"],
    "Arts & Culture": ["arts", "culture"],
    "Community & Service": ["community", "service"],
    "Sports & Recreation": ["sports", "recreation"],
    "Environment & Sustainability": ["environment", "sustainability"]
};

if (userInterests.length > 0 && clubInterests.length > 0) {
    const matchingInterests = userInterests.filter(userInterest => {
        const possibleMatches = interestMap[userInterest] || [userInterest];

        return possibleMatches.some(possibleMatch =>
    clubInterests.some(
        clubInterest =>
            clubInterest.trim().toLowerCase() === possibleMatch.trim().toLowerCase()
    )
); 
    });

    score += (matchingInterests.length / userInterests.length) * 40;

    if (matchingInterests.length > 0) {
        reasons.push(
            `Matches your interests in ${matchingInterests.join(", ")}`
        );
    }
}

const userGoals = preferences.goals || [];
const clubGoals = club.goals || [];

const goalMap = {
    "Career opportunities": ["career development"],
    "Networking": ["networking"],
    "Build technical skills": ["build skills"],
    "Build professional skills": ["build skills"],
    "Leadership opportunities": ["leadership experience"],
    "Make friends": ["make friends"],
    "Find a community": ["find a community"],
    "Affinity": ["affinity"],
    "Have fun": ["have fun"],
    "Explore a new interest": ["explore an interest"],
    "Get outside": ["get outside"],
    "Gain confidence": ["gain confidence"]
};

const matchingGoals = userGoals.filter(userGoal => {
    const possibleMatches = goalMap[userGoal] || [userGoal];

    return possibleMatches.some(possibleMatch =>
        clubGoals.some(
            clubGoal =>
                clubGoal.toLowerCase() === possibleMatch.toLowerCase()
        )
    );
});

if (userGoals.length > 0 && clubGoals.length > 0) {
    const goalScore =
        matchingGoals.length / userGoals.length;

    score += goalScore * 20;

    if (matchingGoals.length > 0) {
        reasons.push(
            `Supports your goal of ${matchingGoals.join(", ")}`
        );
    }
}

    // CLUB TYPE — 10%
    if (preferences.club_type) {
        const clubType = club.club_type?.value;

        if (
            clubType &&
            clubType.toLowerCase() === preferences.club_type.toLowerCase()
        ) {
            score += 10;

            reasons.push(
                `Matches your preference for ${preferences.club_type} clubs`
            );
        }
    }

    // EXPERIENCE — 5%
    if (preferences.experience_level) {
        const experienceLevel = club.experience_level?.value;

        if (
            experienceLevel === "beginner-friendly" &&
            preferences.experience_level === "beginner"
        ) {
            score += 5;
            reasons.push("Beginner-friendly");
        }

        if (
            experienceLevel === "some-experience" &&
            preferences.experience_level === "some-experience"
        ) {
            score += 5;
            reasons.push("Matches your experience level");
        }
    }

    // RECRUITMENT — 10%
    if (preferences.recruitment_preference) {
        const recruitmentPreference =
            club.recruitment_preference?.value;

        if (
            recruitmentPreference ===
            preferences.recruitment_preference
        ) {
            score += 10;

            reasons.push("Matches your recruitment preference");
        }
    }

    // TIME — 15%
    if (preferences.time_commitment) {
        const clubTime = club.time_commitment?.value;

        if (
            clubTime &&
            clubTime === preferences.time_commitment
        ) {
            score += 15;

            reasons.push("Fits your preferred time commitment");
        }
    }

    return {
        score: Math.round(score * 100) / 100,
        reasons
    };
}

function recommendClubs(preferences, limit = 5) {
    const clubs = loadClubs();
    const normalizedPreferences = normalizePreferences(preferences);

    const recommendations = clubs.map(club => {
        const result = calculateRecommendationScore(
            club,
            normalizedPreferences
        );

        return {
            name: club.name,
            category: club.category,
            club_format: club.club_format?.value || null,
            description: club.description,
            instagram: club.instagram || null,
            score: result.score,
            reasons: result.reasons
        };
    });

    recommendations.sort((a, b) => b.score - a.score);

    return recommendations.slice(0, limit);
}

module.exports = {
    recommendClubs
};