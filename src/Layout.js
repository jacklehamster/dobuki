import React from "react";
import { Switch, Route } from "react-router-dom";
import routes from "./routes";
import Helmet from "react-helmet";

class Layout extends React.Component {
    render() {
        return (
            <div>
                <Helmet />
                <Switch>
                    { routes.map( route => <Route key={ route.path } { ...route } /> ) }
                </Switch>
            </div>
        );
    }
}

export default Layout;
