const fs = require("fs");
const path = require("path");

function loadClubs() {
    const filePath = path.join(__dirname, "..", "research", "clubs.json");
    const data = fs.readFileSync(filePath, "utf8");

    return JSON.parse(data);
}

function calculateRecommendationScore(club, preferences) {
    let score = 0;
    const reasons = [];

    // INTERESTS — 40%
    const userInterests = preferences.interests || [];
    const clubInterests = club.interests || [];

    const matchingInterests = userInterests.filter(userInterest =>
        clubInterests.some(
            clubInterest =>
                clubInterest.toLowerCase() === userInterest.toLowerCase()
        )
    );

    if (userInterests.length > 0) {
        const interestScore =
            matchingInterests.length / userInterests.length;

        score += interestScore * 40;

        if (matchingInterests.length > 0) {
            reasons.push(
                `Matches your interests in ${matchingInterests.join(", ")}`
            );
        }
    }

    // GOALS — 20%
    const userGoals = preferences.goals || [];
    const clubGoals = club.goals || [];

    const matchingGoals = userGoals.filter(userGoal =>
        clubGoals.some(
            clubGoal =>
                clubGoal.toLowerCase() === userGoal.toLowerCase()
        )
    );

    if (userGoals.length > 0) {
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

    const recommendations = clubs.map(club => {
        const result = calculateRecommendationScore(
            club,
            preferences
        );

        return {
            name: club.name,
            category: club.category,
            description: club.description,
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