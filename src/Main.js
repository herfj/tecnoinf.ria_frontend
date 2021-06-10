import React, {Component} from "react";
import {Switch, Route, Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {actions} from "react-redux-form";
import Navbar from "./components/navbar/Navbar";
import Home from './scenes/home/Home'

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => ({});

class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const home = ()=>(
            <Home/>
        )
        return (
            <div>
                <Navbar/>
                <Switch>
                    <Route path="/home" component={home}/>

                    <Redirect to="/home"/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
