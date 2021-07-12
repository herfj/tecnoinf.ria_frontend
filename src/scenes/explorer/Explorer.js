import React, {Component, useEffect, useState} from "react";
import Container from "../../components/container/Container";
import {ProjectList} from "../../components/list/List";
import './index.css'
import Searchbar from "../../components/searchbar/Searchbar";
import {useWindowSize} from "../../helpers/useWindowSize";
import {ButtonLink, SelectButton} from '../../components/button/Button'
import {catgoriesOptions} from "../../helpers/consts";
import Connector from "../../utils/connector";
import {getByCats} from "../../modules/project.module";

const SlideBar = ({header, list, selected, setSelected}) => {
    const size = useWindowSize()
    return (
        <div className={'explorer-slide'}>
            <div className={'slide-wrapper'}>
                {header}
                {
                    size.width <= 1200 &&
                    <div style={{marginBottom: 10}}>
                        <Searchbar/>
                    </div>
                }
                {
                    list.map((o) => {
                        return (
                            <ButtonLink
                                styleType={(o.value === selected) ? 'primary' : ''}
                                buttonStyle={{
                                    marginTop: 5
                                }}
                                style={{
                                    marginTop: 5
                                }}
                                onClick={()=>{setSelected(o.value)}}
                            >
                                {o.key}
                            </ButtonLink>
                        )
                    })
                }
            </div>
        </div>
    )
}
const Explorer = ({actions,projects}) => {
    const size = useWindowSize()
    const [selected,setSelected] = useState('')

    useEffect(()=>{
            actions.projects.getAll()
    },[])

    useEffect(()=>{
        if(selected!=='')
        actions.projects.getByCats(selected)
    },[selected])

    const orderByOptions = [
        'Recomendado',
        'Recientes'
    ]

    const [orderBy, setOrderBy] = useState(orderByOptions[0])

    return (
        <div className={'explorer-wrapper'}>
            <SlideBar
                header={<h2>
                    Categorias
                </h2>}
                selected={selected}
                setSelected={setSelected}
                list={catgoriesOptions}
            />

            <div className={'explorer-main'}>
                <Container
                    searchbar={size.width > 1200}
                >
                    <div className={'explorer-header'}>
                        <h1>
                            Explorar
                        </h1>


                    </div>
                    <ProjectList projects={projects ? projects : []}/>
                </Container>
            </div>
        </div>
    )
}

export default (props) => (
    <Connector>
        {({actions, state: {app, projects}}) => {
            return (
                <Explorer actions={actions}  {...app} {...projects} {...props} />
            )
        }}
    </Connector>
)

