import React from "react";
import {ProjectCard} from "../card/Card";
import './index.css'
import {chunkify} from "../../helpers/chunkify";

const ProjectList = ({})=>{
    const list = chunkify([
        <ProjectCard/>,
        <ProjectCard/>,
        <ProjectCard/>,
        <ProjectCard/>,
        <ProjectCard/>,
        <ProjectCard/>,
        <ProjectCard/>,
    ], 3, true);
    return(
        <div className={'project-list'}>
            <div className={'col-l'}>
                {list[0]}
            </div>
            <div className={'col-c'}>
                {list[1]}
            </div>
            <div className={'col-r'}>
                {list[2]}
            </div>
       </div>
    )
}

export {ProjectList}