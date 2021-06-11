import React from "react";
import {ProjectCard} from "../card/Card";
import './index.css'
import {chunkify} from "../../helpers/chunkify";

const List = ({list}) => {
    const listChunkified = chunkify(list, 3, true);
    return (
        <div className={'project-list'}>
            <div className={'col-l'}>
                {listChunkified[0]}
            </div>
            <div className={'col-c'}>
                {listChunkified[1]}
            </div>
            <div className={'col-r'}>
                {listChunkified[2]}
            </div>
        </div>
    )
}

const ProjectList = ({}) => {

    const list =[
        <ProjectCard/>,
        <ProjectCard/>,
        <ProjectCard/>,
        <ProjectCard/>,
        <ProjectCard/>,
        <ProjectCard/>,
        <ProjectCard/>,
    ]

    return (
        <List
            list={list}
        />

    )
}

export {ProjectList}