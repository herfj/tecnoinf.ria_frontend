import React, {Component, useState} from "react";
import Container from "../../components/container/Container";
import {ProjectList} from "../../components/list/List";
import './index.css'
import Searchbar from "../../components/searchbar/Searchbar";
import {useWindowSize} from "../../helpers/useWindowSize";
import {Button, SelectButton} from '../../components/button/Button'

const SlideBar = ({header, list, selectedItem, callback}) => {
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
                            <Button
                                type={(0 === selectedItem) ? 'primary' : ''}
                                style={{
                                    marginTop: 5
                                }}
                                onPress={()=>callback(o)}
                            >
                                {o}
                            </Button>
                        )
                    })
                }
            </div>
        </div>
    )
}
const Explorer = ({}) => {
    const size = useWindowSize()

    const catgoriesOptions = [
        'Diseño Grafico',
        'Fotografía',
        'Literatura',
        'Plastica',
        'Sonido',
        'Escultura',
        '3D',
        'Arquitctura',
    ]

    const orderByOptions = [
        'Recomendado',
        'Recientes'
    ]

    const [orderBy, setOrderBy] = useState(orderByOptions[0])
    const [category, setCategory] = useState(undefined)

    return (
        <div className={'explorer-wrapper'}>
            <SlideBar
                header={<h2>
                    Categorias
                </h2>}
                list={catgoriesOptions}
                selectedItem={category}
                callback={(op) => {
                    setCategory(op)
                }}
            />

            <div className={'explorer-main'}>
                <Container
                    searchbar={size.width > 1200}
                >
                    <div className={'explorer-header'}>
                        <h1>
                            Explorar
                        </h1>

                        <SelectButton
                            list={orderByOptions}
                            callback={(op) => {
                                setOrderBy(op)
                            }}
                            type={'primary'}
                            style={{
                                alignSelf: 'center',
                                width: 120,
                                marginRight: 15
                            }}
                        >
                            Ordenar por
                        </SelectButton>
                    </div>
                    <ProjectList/>
                </Container>
            </div>
        </div>
    )
}

export default Explorer;
