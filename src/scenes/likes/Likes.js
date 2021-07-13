import React, {Component, useEffect, useState} from "react";
import Container from "../../components/container/Container";
import {ProjectList} from "../../components/list/List";
import Connector from "../../utils/connector";
import {getMyLikes} from "../../modules/project.module";

const Likes = ({actions, likes, loggedUser}) => {
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
            {likes && likes.length> 0 ? (
                <ProjectList projects={likes}/>
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
