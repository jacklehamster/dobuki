import React from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import Header from "./Header";

class Home extends React.Component {
    render( ) {
        return (
            <div>
                <Helmet>
                    <title>Home</title>
                </Helmet>
                <Header />

                <pre>
                    { JSON.stringify(this.props.data, null, '\t') }
                </pre>
            </div>
        );
    }
}

const mapStateToProps = ( state ) => ( {
    data: state.data,
} );


export default connect( mapStateToProps )( Home );
