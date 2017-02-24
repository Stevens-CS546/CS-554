const express = require("express");
const app = express();

const makeTestPromise = () => {
    return new Promise((fulfill, reject) => {
        setTimeout(() => {
            fulfill({ status: "Good" });
        }, 2000);
    })
};

app.get("/old", (req, res) => {
    let makeTestPromiseResult = makeTestPromise();

    makeTestPromiseResult.then((result) => {
        res.json(result);
    });
})

app.get("/", async (req, res) => {
    let result = makeTestPromise();
    let secondResult = makeTestPromise();
    let bothResults = await (Promise.all([result, secondResult]));

    res.json(bothResults);
})

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});