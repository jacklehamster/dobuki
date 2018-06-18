import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({ hello: 'world' });
});

var server = app.listen(port, () => {
    console.log('Service started on port :' + port);
});