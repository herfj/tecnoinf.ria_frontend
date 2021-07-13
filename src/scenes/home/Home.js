import React, {Component, useEffect} from "react";
import Container from "../../components/container/Container";
import {ProjectList} from "../../components/list/List";
import Connector from "../../utils/connector";

const Home = ({actions, projects, search}) => {

    useEffect(()=>{
        actions.projects.getAll();
    },[])

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
                <Home actions={actions}  {...app} {...projects} {...props} />
            )
        }}
    </Connector>
)