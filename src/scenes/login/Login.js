import React, {useEffect, useState} from "react";
import './index.css'
import {Button, ButtonLink} from "../../components/button/Button";
import {EmailInput, PwdInput} from "../../components/forms/TextInput";
import {Form, actions} from "react-redux-form";
import {Link} from "react-router-dom";
import Connector from "../../utils/connector";
import { useHistory } from "react-router-dom";

const Login = ({actions, loggedUser, actionResponse}) => {
    const history = useHistory();

useEffect(()=>{
        if (actionResponse.isError){
            alert('hijo de tu puta madre pone las cosas bien');
        }

    },[actionResponse.isError]);
useEffect(()=>{
    if (loggedUser){
        history.push("/home");
    }
},[loggedUser])

    const handleSubmit = (values) => {
        console.log("Current State is: " + JSON.stringify(values));
        actions.app.authenticate(values.email,values.pwd);
        //this.props.resetFeedbackForm();
        // event.preventDefault();
        // this.props.postFeedback(
        //     values.firstname,
        //     values.lastname,
        //     values.telnum,
        //     values.email,
        //     values.agree,
        //     values.contactType,
        //     values.messages
        // );
    }

    return (
        <>
            <div className={'pink-b'}>
                <Link
                    to={'/home'}
                >
                    <h1>DesignPro</h1>
                </Link>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div className={'login-wrapper'}>
                    <h1>Login</h1>
                    <Form
                        model="login"
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        <EmailInput/>
                        <PwdInput style={{marginTop:10}}/>
                        <Button
                            styleType={'primary'}
                            type="submit"
                            style={{marginTop: 20, marginBottom:10}}
                        >
                            Ingresar
                        </Button>

                    </Form>
                    <ButtonLink
                        to={"/register"}

                    >
                        Registrarme
                    </ButtonLink>
                </div>
            </div>
        </>
    )
}

export default (props) => (
    <Connector>
        {({ actions, state: { app } }) => {
            return (
                <Login actions={actions}  {...app} {...props} />
            )
        }}
    </Connector>
)