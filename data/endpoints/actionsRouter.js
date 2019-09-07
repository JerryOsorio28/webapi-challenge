const express = require('express');

//import router from express
const router = express.Router();

//importing actions database
const ActionsDb = require('../helpers/actionModel');
//importing projects database
const ProjectsDb = require('../helpers/projectModel');

//<------------------------------------------------------------------------- GET REQUESTS ----------------
//Returns an array of all the projects objects contained in the database.
router.get('/:id/actions', (req, res) => {

    const { id }  = req.params;

    ProjectsDb.getProjectActions(id)
    // ActionsDb.get(id)
        .then(actions => res.status(200).json(actions))
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: "Unable to fetch actions",
                err: err
            })
        })
})
//<------------------------------------------------------------------------- POST REQUESTS ----------------
router.post('/:id/actions', (req, res) => {

    const { action } = req.body;

    ActionsDb.insert(action)
        .then(action => res.status(201).json(action))
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: "Unable to add action",
                err: err
            })
        })
})
//<------------------------------------------------------------------------- PUT REQUESTS ----------------
router.put('/:id/actions', (req, res) => {

    const { id } = req.params;
    const update = req.body;

    ActionsDb.update(id, update)
        .then(updated => res.status(200).json(updated))
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: "Unable to edit action",
                err: err
            })
        })
})
//<------------------------------------------------------------------------- DELETE REQUESTS ----------------
router.delete('/:id/actions', (req, res) => {

    const { id } = req.params;

    ActionsDb.remove(id)
        .then(removed => res.status(204).end({
            message: "action deleted sucessfully"
        }))
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: "Unable to delete action",
                err: err
            })
        })
})

module.exports = router; 