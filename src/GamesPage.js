import React from "react";
import Helmet from "react-helmet";
import Header from "./Header";

const GamesPage = () => (
    <div>
        <Helmet>
            <title>Projects</title>
            <link href="https://fonts.googleapis.com/css?family=Concert+One|Fredoka+One"
                  rel="stylesheet" media="none" onLoad="if(media!='all')media='all'" />
            <link rel="stylesheet" href="/assets/components.css" />
        </Helmet>
        <Header/>
        <h2>Game</h2>

    </div>
);

export default GamesPage;
