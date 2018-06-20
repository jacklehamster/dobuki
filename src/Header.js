import React from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import icon from "./assets/dobuki.png";
import styles from "./assets/header.css";

const Header = ( { loggedIn } ) => (
    <div>
        <Helmet>
            <link href="https://fonts.googleapis.com/css?family=Concert+One|Fredoka+One"
                  rel="stylesheet" media="none" onLoad="if(media!='all')media='all'" />

        </Helmet>
        <HeaderTitle title="Dobuki.net" icon={icon} />
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
    </div>
);

const mapStateToProps = ( state ) => ( {
    loggedIn: state.loggedIn,
} );

export default connect( mapStateToProps )( Header );

class HeaderTitle extends React.Component {
    static reloadPage() {
        location.replace('');
    }

    render() {
        const divStyle = {
            position: 'fixed',
            background: 'linear-gradient(white, silver)',
            borderBottom: '1px solid gray',
            top: 0, height: 50, width: '100%', zIndex: 2,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center',
        };

        const h1Style = {
            fontSize: 32,
            fontFamily: 'Fredoka One',
            margin: 0,
            color: '#012',
            textShadow: '1px 1px 0 #FFF',
            cursor: 'pointer',
        };

        const imgStyle = {
            width: 50, height: 50,
            cursor: 'pointer',
        };

        return (<div>
            <div style={divStyle} className={styles.header}>
                <img style={imgStyle} src={this.props.icon} onClick={HeaderTitle.reloadPage}/>
                <h1 style={h1Style} onClick={HeaderTitle.reloadPage}>{this.props.title}</h1>
            </div>
            <div style={{ height: 51 }}/>
        </div>);
    }
}