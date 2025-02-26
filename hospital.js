/*
    Your logic is like a doctor
    Request methods:-
    1. GET - Going for a consultation to get a check up
    2. POST - Going to get a new kidney inserted
    3. PUT - Going to get a kidney replaced
    4. DELETE - Going to get a kidney removed

    1. What should happen if they try to delte when there are no Kidneys?
    2. What should happen if they try to make a kidney healthy when all are already healthy?
*/

// Import express module using require function and store it in express variable
const express = require("express");

// Create an express application using express function
const app = express();

const users = [{
    name: "Aditya",
    kidneys: [{
        healthy: false
    }]
}];

// Middleware to parse JSON data in the request body
app.use(express.json());

// Create a router handler for GET request
app.get("/", (req, res) => {

    const adityaKidneys = users[0].kidneys;


    const numberOfKidneys = adityaKidneys.length;
    let numberOfHealthyKidneys = 0;


    for (let i = 0; i < adityaKidneys.length; i++) {

        if (adityaKidneys[i].healthy) {
            numberOfHealthyKidneys++;
        }
    }


    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
    // send the response in JSON format with the number of kidneys, number of healthy kidneys and number of unhealthy kidneys
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    });
});

// Create a route handler for POST request
// Add a new kidney for the user with the health status provided in the request body
app.post("/", (req, res) => {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    });
    // Send the response in JSON format with a message that the "kidney added successfully"
    res.json({
        msg: "Done!"
    });
});

// Create a route handler for PUT request
// Update all the unhealthy kidney to healthy kidney, if there are no unhealthy kidney then return a 411 status code.
app.put("/", (req, res) => {
    if (isThereAtleastOneUnhealthyKidney()) {
        for (let i = 0; i < users[0].kidneys.length; i++) {
            users[0].kidneys[i].healthy = true;
        }
        res.json({
            message: "Kidney Replaced Successfully!",
        });
    }
    else {
        res.status(411).json({
            message: "You have no unhealthy kidney to replace",
        });
    }
});

// Create a route handler to DELETE request

// Remove all the unhealthy kidney, if there are no unhealthy kidney then return a 411 status code

app.delete("/", (req, res) => {
    if (isThereAtleastOneUnhealthyKidney()) {
        const newKidneys = [];
        for (let i = 0; i < users[0].kidneys.length; i++) {
            if (users[0].kidneys[i].healthy) {
                newKidneys.push({
                    healthy: true,
                });
            }
        }
        users[0].kidneys = newKidneys;
        res.json({
            message: "Unhealthy Kidney Removed Successfully!",
        });
    }
    else {

        res.status(411).json({
            message: "You have no unhealthy kidney to remove",
        });
    }
});



// Helper function to check if there is atleast one unhealthy kidney
function isThereAtleastOneUnhealthyKidney() {
    for (let i = 0; i < users[0].kidneys.length; i++) {
        if (!users[0].kidneys[i].healthy) {
            return true;
        }
    }
    return false;
}

app.listen(3000);