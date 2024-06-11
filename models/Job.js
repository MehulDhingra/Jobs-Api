const mongoose = require('mongoose')
const express = require('express')
const jobSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: [true, " Please provide Company Name "]
        },
        position: {
            type: String,
            required: [true, "Please enter the position "]
        },
        status: {
            type: String,
            enum: ['interview', 'declined', 'pending'],
            default: 'pending'
        },
        createdBy : {
            type : mongoose.Types.ObjectId,
            ref : 'userModel',
            required : [true,"Please provide the user"]

        }
    },
    {timestamps: true}

)

module.exports = mongoose.model("jobModel",jobSchema);