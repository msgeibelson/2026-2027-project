const fs = require("fs");
const path = require("path");

const express = require("express");
const cors = require("cors");

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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});