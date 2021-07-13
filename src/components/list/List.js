import React from "react";
import {ProjectCard} from "../card/Card";
import './index.css'
import {chunkify} from "../../helpers/chunkify";
import {Button, ButtonLink} from "../button/Button";
import {useWindowSize} from "../../helpers/useWindowSize";
import {Message as Mess, Message} from "../message/Message";

const List = ({list, responsive = true, style, columnStyle, grid = true}) => {
    const listChunkified = chunkify(list, 3, true);
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

    return (
        <List
            listType={'project'}
            list={ projects && projects.length>0 ? handleList() : []}
        />

    )
}

const CategoryList = ({categories,style, columnStyle}) => {

    return (
        <List
            responsive={false}
            style={style}
            columnStyle={columnStyle}
            list={categories.map((o) => (
                <ButtonLink
                    to={'/explorer'}
                    styleType={'outline'}
                    children={o.Categoria}
                    style={{
                        marginBottom: 5
                    }}
                    buttonStyle={{marginBottom: 5, textTransform: 'capitalize'}}
                />
            ))}
        />
    )
}

const TagList = ({tags,style, columnStyle}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            {tags.map((o) => {
                if(o.Etiquetas1){
                    return (
                <Button
                disabled
                styleType={'outline'}
                children={o.Etiquetas1}
                style={{
                    marginTop: 0,
                    marginRight: 5,
                    width: 'auto',
                }}/>
                )
            } else {
                    return (<></>)
                }

            })}
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