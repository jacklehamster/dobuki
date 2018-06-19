import express from "express";
import path from "path";
import React from "react";
import Helmet from "react-helmet";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import createStore, { initializeSession } from "./store";
import Layout from "./Layout";
const app = express();
const port = process.env.PORT || 3000;

app.use( express.static( path.resolve( __dirname, "../" ) ) );

app.get("/*", (req, res) => {
    const context = { };
    const store = createStore( );
    store.dispatch( initializeSession( ) );

    const reactDom = renderToString(
        <ReduxProvider store={store}>
            <StaticRouter context={context} location={req.url}>
                <Layout/>
            </StaticRouter>
        </ReduxProvider>
    );
    const reduxState = store.getState();
    const helmetData = Helmet.renderStatic();

    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(htmlTemplate(reactDom, reduxState, helmetData));
});


app.listen(port, () => {
    console.log('Service started on port :' + port);
});


function htmlTemplate( reactDom, reduxState, helmetData ) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            ${ helmetData.title.toString( ) }
            ${ helmetData.meta.toString( ) }
            <title>React SSR</title>
        </head>
        
        <body>
            <div id="app">${ reactDom }</div>
            <script>
                window.REDUX_DATA = ${ JSON.stringify( reduxState ) }
            </script>
            <script src="./app.bundle.js"></script>
        </body>
        </html>
    `;
}
