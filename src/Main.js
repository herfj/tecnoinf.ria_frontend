import React, {Component} from "react";
import Connector from "./utils/connector";
import {Switch, Route, Redirect} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from './scenes/home/Home'
import Explorer from "./scenes/explorer/Explorer";
import Project from "./scenes/project/Project";
import Profile from "./scenes/profile/Profile";
import Login from "./scenes/login/Login";
import {Message,Messages,NewMessage} from "./scenes/messages/Messages";
import Register from "./scenes/register/Register";
import EditUser from "./scenes/edituser/EditUser";
import CreateProject from "./scenes/project/CreateProject";

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
const editUser = ({match})=>(
    <EditUser user={{
        name: 'Hernan Fabirca',
        img: 'https://placekitten.com/1200/800',
        ubicacion: 'Sanca',
        desc: `What is Lorem Ipsum?Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it
Where can 
There are many variations of passages of Lorem Ipsum available, but the`,
        link: 'https://www.google.com',
        empresa: 'Cualit',
        profesion: 'SD Jr',
        likes: 200,
        views: 1233,
    }} id={match.params.userId}/>
)
const newMessage = ()=>(
    <NewMessage />
)

const register = () =>(
    <Register/>
)
const createProject = () =>(
    <CreateProject/>
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
                    <Route path="/createproject" component={createProject}/>i
                    <Route path="/register" component={register}/>i
                    <Route path="/edituser/:userId" component={editUser}/>i
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
