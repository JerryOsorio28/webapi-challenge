const express = require('express');

//import router from express
const router = express.Router();

//importing projects database
const ProjectsDb = require('../helpers/projectModel');
//<------------------------------------------------------------------------- GET REQUESTS ----------------
//Returns an array of all the projects objects contained in the database.
router.get('/:id', (req, res) => {

    const { id } = req.params;

    ProjectsDb.get(id)
        .then(projects => res.status(200).json(projects))
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: "Unable to fetch projects",
                err: err
            })
        })
})
//<------------------------------------------------------------------------- POST REQUESTS ----------------
router.post('/', (req, res) => {

    const project = req.body;

    ProjectsDb.insert(project)
        .then(newProject => res.status(201).json(newProject))
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: "Unable to add project",
                err: err
            })
        })
})
//<------------------------------------------------------------------------- PUT REQUESTS ----------------
router.put('/:id', (req, res) => {

    const { id } = req.params;
    const update = req.body;

    ProjectsDb.update(id, update)
        .then(updated => res.status(201).json(updated))
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: "Unable to edit project",
                err: err
            })
        })
})
//<------------------------------------------------------------------------- DELETE REQUESTS ----------------
router.delete('/:id', (req, res) => {

    const { id } = req.params;

    ProjectsDb.remove(id)
        .then(removed => res.status(204).end())
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: "Unable to delete project",
                err: err
            })
        })
})

module.exports = router; 