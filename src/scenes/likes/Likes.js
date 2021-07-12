import React, {Component, useEffect} from "react";
import Container from "../../components/container/Container";
import {ProjectList} from "../../components/list/List";
import Connector from "../../utils/connector";
import {getMyLikes} from "../../modules/project.module";

const Likes = ({actions, projects, loggedUser}) => {
    useEffect(()=>{
        if(loggedUser){
            actions.projects.getMyLikes(loggedUser.Email);
        }
    },[])
    useEffect(()=>{
        if(loggedUser){

        actions.projects.getMyLikes(loggedUser.Email);
        }
    },[loggedUser])

    return (
        <Container>
            {projects && projects.length> 0 ? (
                <ProjectList projects={projects}/>
            ):(
                <h2>No hay proyectos para mostrar</h2>
            )}
        </Container>
    )
}


export default (props) => (
    <Connector>
        {({actions, state: {app, projects}}) => {
            return (
                <Likes actions={actions}  {...app} {...projects} {...props} />
            )
        }}
    </Connector>
)
