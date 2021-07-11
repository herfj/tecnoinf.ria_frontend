import React from "react";
import {ProjectCard} from "../card/Card";
import './index.css'
import {chunkify} from "../../helpers/chunkify";
import {Button, ButtonLink} from "../button/Button";
import {useWindowSize} from "../../helpers/useWindowSize";
import {Message as Mess, Message} from "../message/Message";

const List = ({list, responsive = true, style, columnStyle, grid = true}) => {
    const listChunkified = chunkify(list, 3, true);
    const size = useWindowSize()
    return (
        <>
            {
                grid ? (
                    <div className={responsive ? 'list' : 'list-u'} style={style}>
                        <div className={'col-l'} style={columnStyle}>
                            {listChunkified[0]}
                        </div>
                        <div className={'col-c'} style={columnStyle}>
                            {listChunkified[1]}
                        </div>
                        <div className={'col-r'} style={columnStyle}>
                            {listChunkified[2]}
                        </div>
                    </div>
                ) : (
                    <div style={style}>
                        {list}
                    </div>

                )
            }
        </>
    )
}

const ProjectList = ({projects}) => {

    const handleList =()=>{
        return projects.map((p)=>{
            return <ProjectCard project={p}/>
        })
    }
    const list = projects && projects.length>0 ? handleList() : []

    return (
        <List
            listType={'project'}
            list={list}
        />

    )
}

const CategoryList = ({style, columnStyle}) => {

    const list = [
        'cat 1',
        'cat 2',
        'cat 3',
        'cat 4',
        'cat 5',
    ]

    return (
        <List
            responsive={false}
            style={style}
            columnStyle={columnStyle}
            list={list.map((o) => (
                <ButtonLink
                    to={'/home'}
                    styleType={'outline'}
                    children={o}
                    style={{
                        marginBottom: 5
                    }}
                    buttonStyle={{marginBottom:5}}
                />
            ))}
        />
    )
}

const TagList = ({style, columnStyle}) => {

    const list = [
        'tag 1',
        'tag 2',
        'tag 3',
        'tag 4',
        'tag 5',
        'tag 6',
        'tag 7',
    ]

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            {list.map((o) => (
                <Button
                    disabled
                    styleType={'outline'}
                    children={o}
                    style={{
                        marginRight: 5
                    }}/>
            ))}
        </div>
    )
}

const MessList = ({list,style, columnStyle}) => {

    return (
        <List
            responsive={false}
            grid={false}
            style={style}
            columnStyle={columnStyle}
            list={list}
        />
    )
}

export {ProjectList, TagList, List, CategoryList, MessList}