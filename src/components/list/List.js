import React from "react";
import {ProjectCard} from "../card/Card";
import './index.css'
import {chunkify} from "../../helpers/chunkify";
import {ButtonLink} from "../button/Button";

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


const TagList = ({}) => {

    const list =[
        'tag 1',
        'tag 2',
        'tag 3',
        'tag 4',
        'tag 5',
        'tag 6',
        'tag 7',
    ]

    return (
        <List
            list={list.map((o)=>(<ButtonLink type={'outline'} to={o} children={o}/> ))}
        />

    )
}

export {ProjectList, TagList}