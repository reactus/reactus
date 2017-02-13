import React, {Component} from "react";
import {connect} from "react-redux";
import {hashHistory} from "react-router";
import {bindActionCreators} from "redux";

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="component-index">
                <img src="https://facebook.github.io/react/img/logo_small.png"></img>
                <h1>React is running!</h1>
            </div>
        );
    }
}

function mapStateToProps({}) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
