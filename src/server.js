import express from "express";
import path from "path";
import React from "react";
import Helmet from "react-helmet";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import createStore, { initializeSession } from "./store";
import Layout from "./Layout";
import * as fs from 'fs';
import * as url from 'url';

const app = express();
const port = process.env.PORT || 3000;

app.use( express.static( path.resolve( __dirname, "../" ) ) );
app.use( '/public', express.static( path.resolve( __dirname, "../../public") ) );

app.get("/*", (req, res) => {
    if (handleStatic(req, res)) {
        return;
    }

    const context = { };
    const store = createStore( );
    store.dispatch( initializeSession( ) );

    const reactDom = renderToString(
        <Provider store={store}>
            <StaticRouter context={context} location={req.url}>
                <Layout />
            </StaticRouter>
        </Provider>
    );

    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(htmlTemplate(reactDom, store.getState(), Helmet.renderStatic()));
});


app.listen(port, () => {
    console.log(`Service started on port : ${ port }`);
});

function handleStatic(req, res) {
    const { pathname, search } = url.parse(req.url);
    const file = path.resolve( __dirname, `../../src/public/${pathname}`);
    if(fs.existsSync(file)) {
        if (fs.statSync(file).isDirectory()) {
            if(req.url.charAt(pathname.length-1)!=='/') {
                res.redirect(`${pathname}/${search||''}`);
                return true;
            }
            if(fs.existsSync(path.resolve(file, 'index.html'))) {
                res.sendFile(path.resolve(file, 'index.html'));
                return true;
            }
        } else {
            res.sendFile(file);
            return true;
        }
    }
    return false;
}


function htmlTemplate( reactDom, reduxState, helmet ) {
    return `
        <!DOCTYPE html>
        <html ${helmet.htmlAttributes.toString( ) }>
        <head>
            ${ helmet.title.toString( ) }
            ${ helmet.meta.toString( ) }
            ${ helmet.link.toString() }
        </head>
        
        <body ${helmet.bodyAttributes.toString()}>
            <div id="app">${ reactDom }</div>
            <script>
                window.REDUX_DATA = ${ JSON.stringify( reduxState ) }
            </script>
            <script src="./app.bundle.js"></script>
        </body>
        </html>
    `;
}
