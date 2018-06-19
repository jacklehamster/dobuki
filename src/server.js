import express from "express"


const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    const test = <div></div>;
    res.json({hello: 'world'});
});


app.listen(port, () => {
    console.log('Service started on port :' + port);
});