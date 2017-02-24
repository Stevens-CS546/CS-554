const express = require("express");
const app = express();

const makeTestPromise = () => {
    return new Promise((fulfill, reject) => {
        setTimeout(() => {
            fulfill({ status: "Good" });
        }, 2000);
    })
};

app.use("/", async (req, res) => {
    let result = await makeTestPromise();
    res.json(result);
})

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});