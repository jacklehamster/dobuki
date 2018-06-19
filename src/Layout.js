import React from "react";
import { Switch, Route } from "react-router-dom";
import routes from "./routes";
import Header from "./Header";
import Helmet from "react-helmet";

class Layout extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "Welcome to React SSR!",
        };
    }

    render() {
        return (
            <div>
                <Helmet />
                <h1>{ this.state.title }</h1>
                <Header />
                <Switch>
                    { routes.map( route => <Route key={ route.path } { ...route } /> ) }
                </Switch>
            </div>
        );
    }
}

export default Layout;
