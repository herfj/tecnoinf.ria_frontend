import React, {Component, useState} from "react";
import Container from "../../components/container/Container";
import {ProjectList} from "../../components/list/List";
import './index.css'
import Searchbar from "../../components/searchbar/Searchbar";
import {useWindowSize} from "../../helpers/useWindowSize";
import {ButtonLink, SelectButton} from '../../components/button/Button'
import {catgoriesOptions} from "../../helpers/consts";

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
                            <ButtonLink
                                styleType={(0 === selectedItem) ? 'primary' : ''}
                                buttonStyle={{
                                    marginTop: 5
                                }}
                                style={{
                                    marginTop: 5
                                }}
                                to={'/explorer/'+o.value}
                                onPress={()=>callback(o)}
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
const Explorer = ({}) => {
    const size = useWindowSize()

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
                            styleType={'primary'}
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
