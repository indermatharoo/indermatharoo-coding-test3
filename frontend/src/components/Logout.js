import React, { Component } from 'react';
import ls from 'local-storage'
import {Redirect} from 'react-router-dom';

export default class Logout extends Component {

    constructor(props) {
        super(props)
        ls.remove('api_key');
        ls.remove('first_name');
        this.props.data.forceUpdate();
        // this.props.history.push("/");
    }

    render() {

        const isLoggedIn = ls.get('api_key');
        if(!isLoggedIn) return <Redirect to="/" />;
        
        return (
            <div></div>
        );
    }

}
  