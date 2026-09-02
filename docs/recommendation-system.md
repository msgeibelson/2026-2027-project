# Club Recommendation System

## Goal

Recommend Cornell student organizations that best match a student's
interests, goals, preferences, and available time.

The system should prioritize **fit over prestige or selectivity**.

---

## User Inputs

The recommendation quiz collects six categories of information:

### 1. Interests

Students can select multiple interests:

- Technology
- Data & Analytics
- Finance
- Business & Consulting
- Arts & Creative
- Culture & International
- Community Service
- Research & Science
- Sports & Fitness
- Music & Performance
- Fashion
- Social & Community

### 2. Goals

Students select what they want to get from a club:

- Career development
- Make friends
- Build skills
- Networking
- Explore an interest
- Leadership experience
- Something fun / low-stress

### 3. Time Commitment

Students select their preferred weekly commitment:

- 1–2 hours
- 3–5 hours
- 5+ hours

### 4. Club Type

Students select:

- Mostly social
- Mostly professional
- A mix
- No preference

### 5. Recruitment Preference

Students select:

- I want something selective
- I'm okay with some competition
- I'd rather avoid competitive recruitment
- No preference

### 6. Experience Level

Students select:

- Complete beginner
- Some experience
- Very experienced

---

# Matching Algorithm

Each club receives a score from 0–100 based on how well it
matches the student's preferences.

## Weighting

| Factor | Weight |
|---|---:|
| Interest Match | 40% |
| Goal Match | 20% |
| Time Commitment | 15% |
| Club Type | 10% |
| Recruitment Preference | 10% |
| Experience Level | 5% |

Total: **100%**

---

## Interest Match — 40%

Compare the student's selected interests with the club's interests.

Example:

Student interests:

- Data
- Technology
- Business

Club interests:

- Data
- Analytics
- Consulting

The club receives a high interest-match score because several
interests overlap.

The system should reward multiple relevant matches rather than
requiring an exact match.

---

## Goal Match — 20%

Compare the student's goals with the club's primary benefits.

For example:

A student interested in:

- Career development
- Networking

would receive a high score from a professional organization that
provides networking and career development opportunities.

---

## Time Commitment — 15%

Compare the student's preferred weekly commitment with the club's
expected commitment.

A club requiring 6 hours per week should receive a lower score for a
student looking for a 1–2 hour commitment.

The system should not automatically exclude the club.

Instead, it should reduce the score and explain the mismatch.

Example:

> "This club is a strong interest match, but its expected time
> commitment is higher than your preference."

---

## Club Type — 10%

Compare the student's preferred club environment with the club type.

Examples:

- Professional → professional club = strong match
- Social → social club = strong match
- Mix → professional/social hybrid = strong match
- No preference → neutral score

---

## Recruitment Preference — 10%

Match the student's tolerance for competitive recruitment with the
club's recruitment characteristics.

For example:

A student who wants to avoid competitive recruitment should receive
lower scores for clubs with highly selective, multi-stage recruitment.

However, recruitment difficulty should **never completely prevent**
a club from being recommended.

---

## Experience Level — 5%

Compare the student's experience with the experience expected by the
club.

Beginner-friendly organizations should receive a higher score for
students with no prior experience.

Organizations requiring significant prior experience may receive a
lower score.

---

# Recommendation Output

The system will return the highest-scoring clubs.

Each recommendation should include:

- Club name
- Match percentage
- Short description
- Why it matches
- Potential mismatches
- Recruitment information

Example:

## Cornell Business Analytics

**92% Match**

### Why it matches

- Strong match with your interest in data and business
- Aligns with your career-development goal
- Provides networking opportunities
- Fits your preferred time commitment

### Keep in mind

- Recruitment includes multiple stages
- Application and interview required

---

# Transparency

The recommendation system should explain **why** each club was
recommended.

The system should never simply display:

> "Recommended for you."

Instead, it should show the factors contributing to the recommendation.

This makes the recommendation more transparent and allows users to
decide whether the recommendation actually makes sense.

---

# Important Limitations

The initial recommendation system is rule-based rather than machine
learning based.

This is intentional.

A rule-based system is easier to interpret and provides a baseline
that can later be compared with more advanced recommendation methods.

Future versions may use user feedback to improve recommendations.

Potential future data:

- Clubs saved
- Clubs viewed
- Clubs applied to
- Clubs joined
- User ratings
- User-reported satisfaction

This could eventually support a personalized recommendation model.

---

# Future Improvements

Potential future versions could include:

1. Machine-learning-based recommendations
2. Collaborative filtering
3. Personalized recommendations based on similar students
4. Student feedback
5. Club popularity trends
6. Recruitment difficulty estimates
7. Personalized recruitment calendars
8. AI-powered interview preparation