import React, {Component, useEffect, useState} from "react";
import './index.css'
import {LocalForm} from "react-redux-form";
import {TextInput} from "../forms/TextInput";
import {Button} from "../button/Button";
import Connector from "../../utils/connector";

const Searchbar = ({actions,projects, isLoading})=> {
    const [palabra, setPalabra] = useState('')
    useEffect(() => {
        if (palabra === '') {
            actions.projects.getAll()
        }
    }, [palabra])

    const handleSubmit = (values) => {
        console.log('asfd', values)
        actions.projects.search(values.palabra)
        setPalabra(values.palabra)
    }

    return (
        <LocalForm
            onSubmit={(values) => handleSubmit(values)}
            style={{display: 'flex', flexDirection: 'row'}}
            className={'searchbar-wrapper'}
        >
            <TextInput
                model={'.palabra'}
                id={'palabra'}
                name={'palabra'}
                className='searchbar'
                placeholder={'Buscar'}
            />
            <Button
                type={'submit'}
                styleType={'primary'}
                style={{height: 50, width: 150}}
            >Buscar
            </Button>
            {
                palabra != '' &&
                <Button
                    type={'submit'}
                    styleType={'primary'}
                    style={{marginLeft: 10, height: 50, width: 50}}
                    onClick={() => {
                        setPalabra('')
                    }}
                ><span className="fas fa-times"></span>
                </Button>

            }
        </LocalForm>

    )
}

export default (props) => (
    <Connector>
        {({actions, state: {app, projects}}) => {
            return (
                <Searchbar actions={actions}  {...app} {...projects} {...props} />
            )
        }}
    </Connector>
)
