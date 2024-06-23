// This is a test route to test the database connection
// We then import the express module and then create an instance of express

const express = require('express')
const router = express.Router()

// We then import the databse connection
const getTestDB = require('../db/testdb')

// We then create an object to hold the databse connection
const db = getTestDB()

// GET

// We then create a route to read the database
router.get('/readData', (req, res) => {
    
    // We send the json response, if an error occurs we send the error message
    try {
        res.status(200).json(db)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

// POST

router.post('/writeData', (req, res) => {
    
    // We then create a new object to hold the data
    const newData = {
        id: db.length + 1,
        name: req.body.name
    }

    // We then push the new data to the database
    db.push(newData)
    //We then send the response
    res.status(201).json({"success": true, "message": "successfully added data", newData})
})

// PUT

router.put('/updateData/:id', (req, res) => {

    // We then create a new object to hold the data
    const newData = {
        // We are reading the id from the url, and then updating the name from the body
        id: req.params.id,
        name: req.body.name
    }
    
    // We create a variable to hold the success status
    let success = false
    
    // We loop through the database to find the id, and then update the data
    for(let i=0;i<db.length;i++) {
        console.log(db[i].id)
        if(db[i].id == newData.id) {
            db[i] = newData
            success = true
            res.status(201).json({"success": success, "message": "successfully updated data", newData})
        }
    }

    // else show that the id was not found
    if(success == false) {
        res.status(404).json({"success": success, "message": "id not found"})
    }
})

// DELETE

router.delete('/deleteData/:id', (req, res) => {
    
    // We read the id from the url
    const id = req.params.id

    // We create a variable to hold the success status
    let success = false

    // We loop through the database to find the id, and then delete the data
    for(let i=0;i<db.length;i++) {
        if(db[i].id == id) {
            // We use the splice method to delete the data
            db.splice(i, 1)
            success = true
            res.status(201).json({"success": success, "message": "successfully deleted data"})
        }
    }

    // else show that the id was not found
    if(success == false) {
        res.status(404).json({"success": success, "message": "id not found"})
    }
})

// We then export the router
module.exports = router