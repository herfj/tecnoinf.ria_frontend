import React, {useEffect, useState} from "react";
import './index.css'
import {Button, ButtonLink} from "../../components/button/Button";
import {EmailInput, PwdInput,  DateInput, NameInput, SurnameInput} from "../../components/forms/TextInput";
import {SelectCountry} from "../../components/forms/Select";
import {Form, actions} from "react-redux-form";
import {Link} from "react-router-dom";
import Connector from "../../utils/connector";

const Register = ({loggedUser,actions}) => {

    const handleSubmit = (values) => {
        console.log("Current State is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(values));
        actions.app.signUp({newUser: values})
    }

    return (
        <>
            <div className={'pink-b'}>
                <Link
                    className={''}
                    to={'/home'}
                    style={{
                        textDecoration: 'none',
                    }}
                >
                    <h1>DesignPro</h1>
                </Link>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div className={'register-wrapper'}>
                    <h1>Crear cuenta</h1>
                    <Form
                        model="register"
                        onSubmit={(values) => handleSubmit(values)}
                        >
                        <EmailInput/>
                        <div className={"register-content"}>
                            <div className={"content-left"}>
                                <NameInput/>
                            </div>
                            <div className={"content-der"}
                                 style={{marginLeft:"4%"}}>
                                <SurnameInput/>
                            </div>
                        </div>
                        <PwdInput style={{marginTop:12}}/>
                        <DateInput
                            model={'.Fecha_nac'}
                            id={'Fecha_nac'}
                            name={'Fecha_nac'}
                            style={{marginTop:12}}/>
                        <SelectCountry style={{marginTop:12}}/>
                        <Button
                            styleType={'primary'}
                            type="submit"
                            style={{marginTop: 20}}
                        >
                            Registrarme
                        </Button>

                    </Form>

                </div>
            </div>
        </>
    )
}


export default (props) => (
    <Connector>
        {({ actions, state: { app } }) => {
            return (
                <Register actions={actions}  {...app} {...props} />
            )
        }}
    </Connector>
)