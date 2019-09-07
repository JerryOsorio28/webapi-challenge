const express = require('express');

//import router from express
const router = express.Router();

//importing actions database
const ActionsDb = require('../helpers/actionModel');
//importing projects database
const ProjectsDb = require('../helpers/projectModel');

//<------------------------------------------------------------------------- GET REQUESTS ----------------
//Returns an array of all the projects objects contained in the database.
router.get('/:id', (req, res) => {

    const { id }  = req.params;
    console.log(id)
    // ProjectsDb.getProjectActions(id)
    ActionsDb.get(id)
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
router.post('/', (req, res) => {

    const action = req.body;

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
router.put('/:id', (req, res) => {

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
router.delete('/:id', (req, res) => {

    const { id } = req.params;

    ActionsDb.get(id)
        .then(banana => {
            if(!banana){
                res.status(404).json({
                    message: "Item does not exist"
                })
            }else{
            ActionsDb.remove(id)    
                .then(action => res.status(204).json({
                message: "action deleted sucessfully",
                action: action
                }))
                .catch(err => {
                    res.status(500).json({
                        error: "Unable to delete action"
                    })
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: "Internal error",
                err: err
            })
        })
})

module.exports = router; 