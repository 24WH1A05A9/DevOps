const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "my database name"
});

db.connect((err) => {
    if (err) {
        console.log("Database Connection Failed");
        console.log(err);
        return;
    }

    console.log("Database Connected Successfully");
});

app.get("/", (req, res) => {
    res.send("Event Registration Server Running");
});

app.post("/register", (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        address,
        college,
        department,
        yearStudy,
        studentId,
        city,
        state,
        selectedEvent,
        participationType,
        teamName,
        teamSize,
        shirtSize,
        foodPreference,
        emergencyName,
        relationship,
        emergencyPhone,
        bloodGroup,
        skills,
        reason
    } = req.body;
console.log("=====================================");
    console.log("NEW EVENT REGISTRATION");
    console.log("=====================================");
    console.log(req.body);

    const sql = `
    INSERT INTO registrations
    (
        first_name,
        last_name,
        email,
        phone,
        dob,
        gender,
        address,
        college,
        department,
        year_study,
        student_id,
        city,
        state,
        selected_event,
        participation_type,
        team_name,
        team_size,
        shirt_size,
        food_preference,
        emergency_name,
        relationship_type,
        emergency_phone,
        blood_group,
        skills,
        reason
    )
    VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    const values = [
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        address,
        college,
        department,
        yearStudy,
        studentId,
        city,
        state,
        selectedEvent,
        participationType,
        teamName,
        teamSize,
        shirtSize,
        foodPreference,
        emergencyName,
        relationship,
        emergencyPhone,
        bloodGroup,
        skills,
        reason
    ];
    db.query(sql, values, (err, result) => {

        if (err) {
            console.log("Insert Error");
            console.log(err);

            return res.json({
                success: false,
                message: "Registration Failed"
            });
        }
        console.log("Registration Saved Successfully");
        console.log("Inserted ID :", result.insertId);
        console.log("=====================================");

        res.json({
            success: true,
            data: req.body
        });

    });

});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
