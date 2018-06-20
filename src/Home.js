import React from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";

class Home extends React.Component {
    render( ) {
        return (
            <div>
                <Helmet>
                    <title>Home</title>
                </Helmet>
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
