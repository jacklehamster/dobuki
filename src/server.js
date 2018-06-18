import express from "express";
import cors from 'cors';
import React from "react";
import { renderToString } from "react-dom/server";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({origin: '*'}));

app.get( "/*", ( req, res ) => {
    const jsx = (
        <div>Hello</div>
    );
    const reactDom = renderToString( jsx );
    res.send(reactDom);
} );








app.listen(PORT, () => {
    console.log('Platform: ' + process.platform);
    console.log('listen: ' + PORT);
});

