const express = require('express')

const router = express.Router()
const {
    createJob,
    deleteJob,
    getAllJobs,
    updateJob,
    getJob,
    removeJobs
} = require('../controllers/jobs')

router.route('/').post(createJob).get(getAllJobs).delete(removeJobs);

router.route('/:id').get(getJob).delete(deleteJob).patch(updateJob)

module.exports = router
