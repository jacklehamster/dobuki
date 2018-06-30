import React from "react";
import Helmet from "react-helmet";
import Header from "./Header";

const GamesPage = () => (
    <div>
        <Helmet>
            <title>Games</title>
            <link href="https://fonts.googleapis.com/css?family=Concert+One|Fredoka+One"
                  rel="stylesheet" media="none" onLoad="if(media!='all')media='all'" />
            <link rel="stylesheet" href="/assets/components.css" />
        </Helmet>
        <Header/>
        <h2>Games</h2>
        <div style={{
            padding: '5px 50px',
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            flexWrap: 'wrap',
        }}>
            <iframe frameBorder="0" style={{
                marginBottom: 20,
            }}
                    src="https://itch.io/embed/198002?bg_color=cefafd&amp;fg_color=222222&amp;link_color=186ae7&amp;border_color=bebebe"
                    width="280" height="167" />
            <iframe frameBorder="0"
                    src="https://itch.io/embed/248275?bg_color=23cd44&amp;fg_color=222222&amp;link_color=d11200&amp;border_color=529365"
                    width="280" height="167" />
            <iframe frameBorder="0"
                    src="https://itch.io/embed/223676?bg_color=000000&amp;fg_color=c2c2c2&amp;link_color=afa309&amp;border_color=333333"
                    width="280" height="167" />
            <iframe frameBorder="0"
                    src="https://itch.io/embed/218761?bg_color=fcfcf2&amp;fg_color=222222&amp;link_color=fa5c5c&amp;border_color=cab6b6"
                    width="280" height="167" />
            <iframe frameBorder="0"
                    src="https://itch.io/embed/18395?bg_color=000000&amp;fg_color=9899ae&amp;link_color=5c5ffa&amp;border_color=333333"
                    width="280" height="167" />
            <iframe frameBorder="0"
                    src="https://itch.io/embed/170228?bg_color=e1daf6&amp;fg_color=222222&amp;link_color=d2d079&amp;border_color=a589c1"
                    width="280" height="167" />
            <iframe frameBorder="0"
                    src="https://itch.io/embed/116068?bg_color=edf7f8&amp;fg_color=222222&amp;link_color=5c99fa&amp;border_color=c1c5c5"
                    width="280" height="167" />
            <iframe frameBorder="0"
                    src="https://itch.io/embed/136767?bg_color=e79797&amp;fg_color=222222&amp;link_color=f0b214&amp;border_color=ff2525"
                    width="280" height="167" />
            <iframe frameBorder="0"
                    src="https://itch.io/embed/122302?bg_color=eeffff&amp;fg_color=222222&amp;link_color=49a2ac&amp;border_color=bebebe"
                    width="280" height="167" />
        </div>
    </div>
);

export default GamesPage;
