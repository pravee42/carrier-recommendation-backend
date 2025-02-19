const getJobCollection = require("../models/jobModel");

const postJob = async (req, res) => {
    try {
        const { title, description, salary, location } = req.body;
        const jobs = getJobCollection();

        await jobs.insertOne({ title, description, salary, location });
        res.status(201).json({ message: "Job posted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error posting job" });
    }
};

const getJobs = async (req, res) => {
    try {
        const jobs = getJobCollection();
        const jobList = await jobs.find({}).toArray();
        res.json(jobList);
    } catch (error) {
        res.status(500).json({ message: "Error fetching jobs" });
    }
};

module.exports = { postJob, getJobs };
