import React, {Component} from "react";
import Connector from "./utils/connector";
import {Switch, Route, Redirect} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from './scenes/home/Home'
import Explorer from "./scenes/explorer/Explorer";
import Project from "./scenes/project/Project";
import Profile from "./scenes/profile/Profile";
import Login from "./scenes/login/Login";
import {Message,Messages, NewMessage} from "./scenes/messages/Messages";
import Register from "./scenes/register/Register";
import EditUser from "./scenes/edituser/EditUser";


const home = ()=>(
    <Home/>
)

const explorer = ()=>(
    <Explorer/>
)

const project = ()=>(
    <Project/>
)

const profile = ()=>(
    <Profile/>
)

const login = ()=>(
    <Login/>
)

const messages = ()=>(
    <Messages/>
)

const message = ({match})=>(
    <Message id={match.params.messId}/>
)

const newMessage = ()=>(
    <NewMessage />
)

const register = () =>(
    <Register/>
)
class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navbar/>
                <Switch>
                    <Route path="/home" component={home}/>
                    <Route path="/explorer" component={explorer}/>
                    <Route path="/project" component={project}/>i
                    <Route path="/profile" component={profile}/>i
                    <Route exact path="/messages" component={messages}/>
                    <Route path="/messages/new" component={newMessage}/>
                    <Route path="/messages/:messId" component={message}/>
                    <Route path="/login" component={login}/>i
                    <Route path="/register" component={register}/>i
                    <Route path="/edituser" component={EditUser}/>i
                    <Redirect to="/home"/>
                </Switch>
            </div>
        );
    }
}

export default (props) => (
    <Connector>
        {({ actions, state: { app } }) => {
            return (
                <Main actions={actions}  {...app} {...props} />
            )
        }}
    </Connector>
)
