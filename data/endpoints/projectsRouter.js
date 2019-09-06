const express = require('express');

//importing projects database
const projectsDb = require('../helpers/projectModel.js');

//import router from express
const router = express.Router();


//<------------------------------------------------------------------------- GET REQUESTS ----------------
//Returns an array of all the projects objects contained in the database.
router.get('/', (req, res) => {
    projectsDb.get()
        .then(projects => res.status(200).json(projects))
        .catch(err => {
            res.status(500).json({
                error: "Unable to fetch projects",
                err: err
            })
        })
})
