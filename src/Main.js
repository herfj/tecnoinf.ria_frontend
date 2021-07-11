import React, {useState, useEffect} from "react";
import Connector from "./utils/connector";
import {Switch, Route, Redirect} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from './scenes/home/Home'
import Explorer from "./scenes/explorer/Explorer";
import Project from "./scenes/project/Project";
import Profile from "./scenes/profile/Profile";
import Login from "./scenes/login/Login";
import Messages from "./scenes/messages/Messages";
import Message from "./scenes/message/Message";
import NewMessage from "./scenes/newMessage/NewMessage";
import Register from "./scenes/register/Register";
import EditUser from "./scenes/edituser/EditUser";
import CreateProject from "./scenes/createProject/CreateProject";
import EditPort from "./scenes/portfolio/EditPort";

const home = ()=>(
    <Home/>
)

const explorer = ()=>(
    <Explorer/>
)

const project = ()=>(
    <Project/>
)

const profile = ({match})=>(
    <Profile emailUser={match.params.emailUser}/>
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
const editUser = ()=>(
    <EditUser/>
)
const newMessage = ({match})=>(
<NewMessage email={match.params.email}/>
)

const register = () =>(
    <Register/>
)
const createProject = () =>(
    <CreateProject/>
)
const editPort = ({match})=>(
    <EditPort id={match.params.portId}/>
)

const FileUploadPage = ()=>{

    const [selectedFile, setSelectedFile] = useState();

    const [isFilePicked, setIsFilePicked] = useState(false);

    const [isSelected,setIsSelected]=useState(false)

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
    };


    const handleSubmission = () => {
    };


    return(
        <div>
            <input type="file" name="file" onChange={changeHandler} />

            {isSelected ? (

                <div>

                    <p>Filename: {selectedFile.name}</p>

                    <p>Filetype: {selectedFile.type}</p>

                    <p>Size in bytes: {selectedFile.size}</p>

                    <p>

                        lastModifiedDate:{' '}

                        {/*{selectedFile.lastModifiedDate.toLocaleDateString()}*/}

                    </p>

                </div>

            ) : (

                <p>Select a file to show details</p>

            )}

            <div>

                <button onClick={handleSubmission}>Submit</button>

            </div>

        </div>

    )

}

const Main = ({actions})=>{

    useEffect(()=>{
       // actions.app.validate()
    },[])

        return (
            <div>
                <Navbar/>
                <Switch>
                    <Route path="/home" component={home}/>
                    <Route path="/explorer" component={explorer}/>
                    <Route path="/project" component={project}/>i
                    <Route path="/profile/:emailUser" component={profile}/>
                    <Route exact path="/messages" component={messages}/>
                    <Route path="/messages/new/:email" component={newMessage}/>
                    <Route path="/messages/:messId" component={message}/>
                    <Route path="/login" component={login}/>
                    <Route path="/create_project" component={createProject}/>
                    <Route path="/register" component={register}/>
                    <Route path="/edit_user" component={editUser}/>
                    <Route path="/edit_project/:portId" component={editPort}/>
                    <Route path={'/test'} component={FileUploadPage}/>
                    <Redirect to="/home"/>
                </Switch>
            </div>
        );

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
