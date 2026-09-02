const fs = require("fs");
const path = require("path");

const express = require("express");
const cors = require("cors");

const { recommendClubs } = require("./recommendations");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

//Clubs Endpoint:

app.get("/api/clubs", (req, res) => {
    const filePath = path.join(__dirname, "..", "research", "clubs.json");

    const data = fs.readFileSync(filePath, "utf8");
    let clubs = JSON.parse(data);

    const { category, interest } = req.query;

    if (category) {
        clubs = clubs.filter(
            club => club.category.toLowerCase() === category.toLowerCase()
        );
    }

    if (interest) {
        clubs = clubs.filter(club =>
            club.interests.some(
                item => item.toLowerCase() === interest.toLowerCase()
            )
        );
    }

    res.json(clubs);
});

app.get("/api/recommendations", (req, res) => {
    const preferences = {
        interests: req.query.interests
            ? req.query.interests.split(",")
            : [],

        goals: req.query.goals
            ? req.query.goals.split(",")
            : [],

        club_type: req.query.club_type || null,

        time_commitment: req.query.time_commitment || null,

        recruitment_preference:
            req.query.recruitment_preference || null,

        experience_level:
            req.query.experience_level || null
    };

    const recommendations = recommendClubs(preferences);

    res.json(recommendations);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});