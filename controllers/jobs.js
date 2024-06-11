const express = require('express');
const Job = require('../models/Job');

const getJob = async (req, res, next) => {
    try {
        console.log(req.params);
        const k = req.params.id
        const jobs = await Job.find({ _id: k, createdBy: req.body.user.id });
        console.log(jobs);
        res.status(200).json({ jobs });
    } catch (error) {
        // handle error
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching job.' });
    }
};

const getAllJobs = async (req, res, next) => {
    try {
        const jobs = await Job.find({ createdBy: req.body.user.id });
        console.log(jobs);
        res.status(200).json({ jobs: jobs, length: jobs.length });
    } catch (error) {
        // handle error
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching jobs.' });
    }
};

const createJob = async (req, res, next) => {
    req.body.createdBy = req.body.user.id;
    try {
        const jb = await Job.create({ ...req.body });
        res.status(201).send(jb);
    }
    catch (e) {
        res.status(400).send(e);
    }
};

const deleteJob = async (req, res, next) => {
    try {
        await Job.deleteOne({ _id: req.params.id })
        res.status(200).json({ msg: "Job deleted" });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ msg: "An error occured while deleting jobs" });
    }

};

const removeJobs = async (req, res, next) => {
    res.status(200).json({ body: req.body });
};

const updateJob = async (req, res, next) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true, runValidators: true })
        res.status(200).json({ job });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ msg: "An error occured while updating jobs" });
    }
};

module.exports = { getJob, createJob, deleteJob, removeJobs, getAllJobs, updateJob };
