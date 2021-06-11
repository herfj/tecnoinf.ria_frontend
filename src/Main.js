import React, {Component} from "react";
import {Switch, Route, Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {actions} from "react-redux-form";
import Navbar from "./components/navbar/Navbar";
import Home from './scenes/home/Home'
import Explorer from "./scenes/explorer/Explorer";

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => ({});

const home = ()=>(
    <Home/>
)

const explorer = ()=>(
    <Explorer/>
)

class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {

        return (
            <div>
                <Navbar/>
                <Switch>
                    <Route path="/home" component={home}/>
                    <Route path="/explorer" component={explorer}/>
                    <Redirect to="/home"/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
