import React, {useEffect, useState} from "react";
import './index.css'
import {Button, ButtonLink} from "../../components/button/Button";
import {EmailInput, PwdInput} from "../../components/forms/TextInput";
import {Form, actions} from "react-redux-form";
import {Link} from "react-router-dom";

const Login = ({}) => {

    const handleSubmit = (values) => {
        console.log("Current State is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(values));
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

export default Login;