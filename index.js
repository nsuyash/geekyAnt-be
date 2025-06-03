const mongoose = require('mongoose');
const express = require("express")
const cors = require("cors")

require("dotenv").config();

const { initializeDatabase } = require("./db/db.connect")

const authRoutes = require('./routes/auth');
const engineerRoutes = require('./routes/engineers');
const projectRoutes = require('./routes/projects');
const assignmentRoutes = require('./routes/assignments');

const corsOpt = {
    origin: "*",
    credentials: true
}

const app = express();
app.use(express.json());
app.use(cors(corsOpt))

initializeDatabase()


app.get("/", (req, res) => {
    res.send("Backend server is Live...");
});


app.use('/auth', authRoutes);
app.use('/engineers', engineerRoutes);
app.use('/projects', projectRoutes);
app.use('/assignments', assignmentRoutes);

const PORT = process.env.PORT || 5001
app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`))