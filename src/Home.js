import React from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";

class Home extends React.Component {
    render( ) {
        return (
            <div>
                Home
                <Helmet>
                    <title>Home</title>
                </Helmet>
            </div>
        );
    }
}

const mapStateToProps = ( state ) => ( {
    circuits: state.data,
} );


export default connect( mapStateToProps )( Home );
