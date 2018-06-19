import React from "react";
import { connect } from "react-redux";

class Home extends React.Component {
    render( ) {
        return (
            <div>
                Home
            </div>
        );
    }
}

const mapStateToProps = ( state ) => ( {
    circuits: state.data,
} );


export default connect( mapStateToProps )( Home );
