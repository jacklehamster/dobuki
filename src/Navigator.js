import React from "react";
import { Switch, Link, Route, withRouter } from "react-router-dom";
import Helmet from "react-helmet";

const NavigatorWithRouter = withRouter(props => <Navigator {...props}/>);

const NavButton = ( { label, url } ) => {
    return <Switch>
            <Route key="selected" exact path={url} component={()=>(
                <Link to={url} className="tab selected">{label}</Link>
            )} />
            <Route path="*" component={()=>(
                <Link to={url} className="tab">{label}</Link>
            )} />
        </Switch>;
};

const Navigator = ( props ) => {
    const { links } = props;
    const fontFamily = "'Concert One', cursive";
    return (<div>
        <Helmet>
            <link href="https://fonts.googleapis.com/css?family=Concert+One|Fredoka+One"
                  rel="stylesheet" media="none" onLoad="if(media!='all')media='all'" />
            <link rel="stylesheet" href="/assets/navigator.css" />
        </Helmet>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 50,
            backgroundColor: "#ffeccc",
        }}>
            <div style={{
                flexDirection: 'row',
                display: 'flex',
                width: 750,
                maxWidth: '90vw',
                fontFamily,
                borderRadius: 5,
            }}>
                {
                    links.map((link) => <NavButton key={link.url} {...link} />)
                }
            </div>
        </div>
    </div>);
};

export default NavigatorWithRouter;
