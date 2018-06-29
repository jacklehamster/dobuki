import React from "react";
import Helmet from "react-helmet";
import Header from "./Header";
import Api from "./api";

class VideosPage extends React.Component {
    constructor(props) {
        super(props);
        this.api = new Api();
        this.state = {
            videos: [],
        };
    }

    loadYoutube() {
        this.api.youtube(response => {
            if(response.success) {
                this.setState({
                    videos: response.result,
                });
            }
        });
    }

    componentDidMount() {
        this.loadYoutube();
    }

    openYoutube(id) {
        window.open(`https://www.youtube.com/watch?v=${id}`);
        console.log(id);
    }

    render() {
        const fontFamily = "'Concert One', cursive";
        return <div>
            <Helmet>
                <title>Videos</title>
                <link rel="stylesheet" href="/assets/components.css" />
            </Helmet>
            <Header/>
            <div style={{
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <h2>Videos</h2>
                <iframe style={{
                    height: 60,
                    width: 180,
                    border: 0,
                }} src="/youtube-button/">
                </iframe>
            </div>

            <div style={{
                borderTop: "1px solid #E0ECEF",
                padding: '5px 150px',
                justifyContent: 'center',
                textAlign: 'center',
                display: 'flex',
                flexWrap: 'wrap',
            }}>
                {
                    this.state.videos.map((video) => {
                        return <div key={video.id}
                                className="youtubeThumbnail"
                                    style={{
                                        fontFamily,
                                    }}>
                            <div className="youtubeImage"
                                 onClick={e => this.openYoutube(video.id)}
                                 style={{
                                     backgroundImage: `url(${video.url})`,
                                 }}>
                            </div>
                            <div>{video.title}</div>
                        </div>;
                    })
                }
            </div>
        </div>;
    }
}

export default VideosPage;
