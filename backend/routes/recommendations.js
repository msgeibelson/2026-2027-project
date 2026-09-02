function calculateMatch(student, club) {
    let score = 0;

    // Interest Match — 40%
    const matchingInterests = student.interests.filter(interest =>
        club.interests.includes(interest)
    );

    const interestScore =
        student.interests.length > 0
            ? matchingInterests.length / student.interests.length
            : 0;

    score += interestScore * 40;

    // Goal Match — 20%
    const matchingGoals = student.goals.filter(goal =>
        club.career_focus.includes(goal)
    );

    const goalScore =
        student.goals.length > 0
            ? matchingGoals.length / student.goals.length
            : 0;

    score += goalScore * 20;

    // Time Commitment — 15%
    if (student.time_commitment === club.time_commitment) {
        score += 15;
    }

    // Club Type — 10%
    if (
        student.club_type === club.club_type ||
        student.club_type === "no-preference"
    ) {
        score += 10;
    }

    // Recruitment Preference — 10%
    if (
        student.recruitment_preference ===
        club.recruitment_preference
    ) {
        score += 10;
    }

    // Experience Level — 5%
    if (
        student.experience_level ===
        club.experience_level
    ) {
        score += 5;
    }

    return Math.round(score);
}

module.exports = { calculateMatch };