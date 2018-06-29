import React from "react";
import Helmet from "react-helmet";
import Header from "./Header";

const ProjectsPage = () => (
    <div>
        <Helmet>
            <title>Projects</title>
            <link href="https://fonts.googleapis.com/css?family=Concert+One|Fredoka+One"
                  rel="stylesheet" media="none" onLoad="if(media!='all')media='all'" />
            <link rel="stylesheet" href="/assets/components.css" />
        </Helmet>
        <Header/>
        <div style={{
            padding: '5px 50px',
            justifyContent: 'center',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: "'Concert One', cursive",
        }}>
            <h2>Projects</h2>
            <div className="paragraph">
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "end",
                }}>
                    <div style={{ marginRight: 10 }}>
                        <div><a href="/sudoku">Sudoku Solver</a></div>
                        <div className="summary">
                            Sudoku Solver is able to solve any Sudoku Puzzle. In fact, every refresh you
                            see is a new Sudoku Puzzle solved by the algorithm. The solver uses WebAssembly
                            and WebWorkers to run smoothly and efficiently. Note that the algorithm itself
                            is not perfect at solving Sudoku puzzle, but it is successful at it nearly 100%
                            of the time because of retries hundreds of times per second.
                        </div>
                    </div>
                    <iframe frameBorder="0" width="80" height="80" src="/sudoku"/>
                </div>
            </div>

            <div className="paragraph">
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "end",
                }}>
                    <div style={{ marginRight: 10 }}>
                        <div><a href="/webgl/animation">WebGL Sprite Animator</a></div>
                        <div className="summary">This project is a work in progress for a tool that will facilitate transfer
                            of animated Flash movieclips to javascript. The first step is splitting the
                            animation into pngs, and spilling out a JSON file containing all the details
                            for reproducing the animation. Then the files get combined into one single
                            SpriteSheet. The display goes through WebGL, because this project is mainly for
                            gaming, so we want the best performing graphics technology on the Web.
                        </div>
                    </div>
                    <iframe frameBorder="0" width="80" height="100" src="/webgl/animation"/>
                </div>
            </div>

            <div className="paragraph">
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "right",
                }}>
                    <div style={{ marginRight: 10 }}>
                        <div><a href="/click-and-point-editor">Click and Point Editor</a></div>
                        <div className="summary">A collaboration with <a href="https://www.linkedin.com/in/leobenkel/">
                            Leo Benkel</a>. The goal is to
                            devise an easy way to make point and click games. The version shown here is a
                            bit behind the one on the <a href="https://github.com/The-Brains/ClickAndPointLib">
                                official repo</a>, but it showcases an GUI editor for editing the game as you
                            play it, which I believe is the most friendly way to build a point and click game.
                        </div>
                    </div>
                    <div style={{
                        minWidth: 80, minHeight: 80,
                        backgroundSize: "80px 49px",
                        backgroundImage: "url(assets/click-and-point-thumbnail.png)",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                    }}>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default ProjectsPage;
